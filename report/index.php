<?php
session_start();
require_once __DIR__ . '/config.php';

// CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
$csrf_token = $_SESSION['csrf_token'];

// Safe output helper
function e($v)
{
    return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Get eventId from query parameter, default to event 22 (22/11)
$eventId = isset($_GET['eid']) ? (int)$_GET['eid'] : 22;

// Event information
$events = [
    22 => ['date' => '22 November 2025', 'name' => 'Event 22/11'],
    29 => ['date' => '29 December 2025', 'name' => 'Event 29/12']
];

$currentEvent = isset($events[$eventId]) ? $events[$eventId] : $events[22];

// Stats
$stats = [
    'totalRSVP' => 0,
    'attending' => 0,
    'notAttending' => 0,
    'pending' => 0,
    'totalPax' => 0,
    'eventId' => $eventId,
    'eventName' => $currentEvent['name']
];

// Count total RSVPs for specific event
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ?")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['totalRSVP']);
    $stmt->fetch();
    $stmt->close();
}

// Count attending (confirmAttendance = 'y')
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND confirmAttendance = 'y'")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['attending']);
    $stmt->fetch();
    $stmt->close();
}

// Count not attending (confirmAttendance = 'n')
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND confirmAttendance = 'n'")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['notAttending']);
    $stmt->fetch();
    $stmt->close();
}

// Count pending (confirmAttendance is NULL or empty)
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND (confirmAttendance IS NULL OR confirmAttendance = '')")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['pending']);
    $stmt->fetch();
    $stmt->close();
}

// Calculate total pax (sum of all attendeesPax)
if ($stmt = $conn->prepare("SELECT SUM(CAST(attendeesPax AS UNSIGNED)) FROM wish WHERE eventId = ?")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['totalPax']);
    $stmt->fetch();
    $stmt->close();
    // If no pax or null, set to 0
    if ($stats['totalPax'] === null) {
        $stats['totalPax'] = 0;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en" class="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="https://astrus.my/asset/logo-1080.ico">
    <title>RSVP Dashboard</title>

    <!-- Tailwind CSS CDN -->
    <script>
        // Suppress Tailwind CDN production warning
        window.process = {
            env: {
                NODE_ENV: 'production'
            }
        };
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Initialize theme before page renders to prevent flash
        (function() {
            const theme = localStorage.getItem('theme') || 'light';
            document.documentElement.classList.add(theme);
            if (theme === 'dark') {
                document.documentElement.classList.remove('light');
            }
        })();
    </script>

    <!-- DataTables CSS (Bootstrap 5 style for light theme) -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.7/css/dataTables.bootstrap5.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <!-- CSP for security -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' https: data:;">

    <style>
        /* Override Bootstrap DataTables dark styling */
        .dataTables_wrapper {
            background: white !important;
            color: #1f2937 !important;
        }

        .dataTables_wrapper .dataTables_filter input,
        .dataTables_wrapper .dataTables_length select {
            background: white !important;
            color: #1f2937 !important;
            border: 1px solid #d1d5db !important;
        }

        table.dataTable thead th,
        table.dataTable thead td {
            background-color: #f9fafb !important;
            color: #4b5563 !important;
        }

        table.dataTable tfoot td {
            background-color: #f9fafb !important;
            color: #4b5563 !important;
        }

        table.dataTable tbody tr {
            background-color: white !important;
        }

        table.dataTable tbody tr:hover {
            background-color: #f9fafb !important;
        }

        /* Custom Loader Spinner */
        #custom-loader {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(4px);
        }

        .loader-content {
            background: white;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .spinner {
            width: 60px;
            height: 60px;
            margin: 0 auto 1rem;
            border: 4px solid #e5e7eb;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .loader-text {
            color: #4b5563;
            font-size: 0.875rem;
            font-weight: 500;
        }

        /* Hide default DataTables processing message */
        .dataTables_processing {
            display: none !important;
        }

        /* Attendance Badge Styles */
        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }

        .badge-yes {
            background-color: #d1fae5;
            color: #065f46;
        }

        .badge-no {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .badge-null {
            background-color: #e5e7eb;
            color: #6b7280;
        }

        /* Clickable Stat Cards */
        .stat-card {
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }

        .stat-card.active {
            border-color: #3b82f6;
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3);
        }

        .dark .stat-card.active {
            border-color: #60a5fa;
            box-shadow: 0 10px 25px -5px rgba(96, 165, 250, 0.3);
        }

        /* Dark Mode Styles */
        .dark {
            color-scheme: dark;
        }

        .dark body {
            background-color: #111827 !important;
            color: #f9fafb !important;
        }

        .dark .bg-white {
            background-color: #1f2937 !important;
        }

        .dark .text-gray-900 {
            color: #f9fafb !important;
        }

        .dark .text-gray-700 {
            color: #d1d5db !important;
        }

        .dark .text-gray-500 {
            color: #9ca3af !important;
        }

        .dark .text-gray-400 {
            color: #6b7280 !important;
        }

        .dark .bg-gray-100 {
            background-color: #374151 !important;
            color: #f9fafb !important;
        }

        .dark .bg-gray-50 {
            background-color: #1f2937 !important;
        }

        .dark .shadow {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.36) !important;
        }

        .dark .dataTables_wrapper {
            background: #1f2937 !important;
            color: #f9fafb !important;
        }

        .dark .dataTables_wrapper .dataTables_filter input,
        .dark .dataTables_wrapper .dataTables_length select {
            background: #374151 !important;
            color: #f9fafb !important;
            border: 1px solid #4b5563 !important;
        }

        .dark table.dataTable thead th,
        .dark table.dataTable thead td {
            background-color: #1f2937 !important;
            color: #d1d5db !important;
            border-color: #374151 !important;
        }

        .dark table.dataTable tfoot td {
            background-color: #1f2937 !important;
            color: #d1d5db !important;
            border-color: #374151 !important;
        }

        .dark table.dataTable tbody tr {
            background-color: #1f2937 !important;
            color: #f9fafb !important;
            border-color: #374151 !important;
        }

        .dark table.dataTable tbody tr:hover {
            background-color: #374151 !important;
        }

        .dark table.dataTable tbody td {
            border-color: #374151 !important;
        }

        .dark .loader-content {
            background: #1f2937 !important;
            color: #f9fafb !important;
        }

        .dark .loader-text {
            color: #d1d5db !important;
        }

        /* Theme Toggle Button */
        .theme-toggle {
            position: relative;
            width: 60px;
            height: 30px;
            background-color: #d1d5db;
            border-radius: 9999px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .dark .theme-toggle {
            background-color: #3b82f6;
        }

        .theme-toggle-circle {
            position: absolute;
            top: 3px;
            left: 3px;
            width: 24px;
            height: 24px;
            background-color: white;
            border-radius: 50%;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }

        .dark .theme-toggle-circle {
            transform: translateX(30px);
        }
    </style>
</head>

<body class="bg-gray-100 text-gray-800 min-h-screen">

    <!-- Custom Loader Overlay - Show by default on page load -->
    <div id="custom-loader" style="display: flex;">
        <div class="loader-content">
            <div class="spinner"></div>
            <div class="loader-text">Loading wishes...</div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div class="flex items-center gap-4">
                <h1 class="text-3xl font-bold text-gray-900">RSVP Report for Walimatulurus</h1>
                <!-- Theme Toggle -->
                <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">🌞</span>
                    <div class="theme-toggle" onclick="toggleTheme()" id="theme-toggle">
                        <div class="theme-toggle-circle" id="theme-toggle-circle">
                            <span id="theme-icon">☀️</span>
                        </div>
                    </div>
                    <span class="text-sm text-gray-500">🌙</span>
                </div>
            </div>
            <p class="text-sm text-gray-500 mt-2 sm:mt-0"><?= "Today - " . date('j F Y') ?></p>
        </div>

        <!-- Event Switcher -->
        <div class="mb-8">
            <div class="bg-white p-4 rounded-2xl shadow">
                <div class="flex flex-wrap gap-3">
                    <button onclick="switchEvent(22)"
                        id="btn-event-22"
                        class="event-btn px-6 py-3 rounded-lg font-medium transition-all <?= $eventId === 22 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' ?>">
                        📅 Event 22/11 - Walimatulurus Syukriah & Faiz
                    </button>
                    <button onclick="switchEvent(29)"
                        id="btn-event-29"
                        class="event-btn px-6 py-3 rounded-lg font-medium transition-all <?= $eventId === 29 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' ?>">
                        📅 Event 29/11 - Majlis Bertandang
                    </button>
                </div>
            </div>
        </div>

        <!-- Stat Cards -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div class="stat-card bg-white p-6 rounded-2xl shadow active"
                id="card-all"
                onclick="filterByStatus('all')"
                title="Click to show all RSVPs">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm text-gray-500">Total RSVP</h6>
                        <h3 class="text-3xl font-bold text-blue-600 mt-2" id="total-rsvp"><?= e($stats['totalRSVP']) ?></h3>
                    </div>
                    <div class="text-4xl">📊</div>
                </div>
            </div>

            <div class="stat-card bg-white p-6 rounded-2xl shadow"
                id="card-attending"
                onclick="filterByStatus('attending')"
                title="Click to show only attending guests">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm text-gray-500">Attending</h6>
                        <h3 class="text-3xl font-bold text-green-600 mt-2" id="total-attending"><?= e($stats['attending']) ?></h3>
                    </div>
                    <div class="text-4xl">✅</div>
                </div>
            </div>

            <div class="stat-card bg-white p-6 rounded-2xl shadow"
                id="card-not-attending"
                onclick="filterByStatus('not-attending')"
                title="Click to show only non-attending guests">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm text-gray-500">Not Attending</h6>
                        <h3 class="text-3xl font-bold text-red-600 mt-2" id="total-not-attending"><?= e($stats['notAttending']) ?></h3>
                    </div>
                    <div class="text-4xl">❌</div>
                </div>
            </div>

            <div class="stat-card bg-white p-6 rounded-2xl shadow"
                id="card-pending"
                onclick="filterByStatus('pending')"
                title="Click to show only pending guests">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm text-gray-500">Unsure</h6>
                        <h3 class="text-3xl font-bold text-amber-600 mt-2" id="total-pending"><?= e($stats['pending']) ?></h3>
                    </div>
                    <div class="text-4xl">⏳</div>
                </div>
            </div>
        </div>

        <!-- Total Pax Card -->
        <div class="grid gap-6 mb-8">
            <div class="bg-white p-6 rounded-2xl shadow-lg text-white">
                <div class="flex items-center justify-between">
                    <div>
                        <h6 class="text-sm text-gray-500">Total Pax (Expected Guests)</h6>
                        <h3 class="text-4xl text-amber-600 font-bold mt-2" id="total-pax"><?= e($stats['totalPax']) ?></h3>
                        <p class="text-xs text-gray-400 mt-2">Based on current filter</p>
                    </div>
                    <div class="text-5xl">👥</div>
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="bg-white p-6 rounded-2xl shadow">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h5 class="text-lg font-semibold text-gray-700">RSVP List</h5>
                    <p class="text-xs text-gray-500 mt-1" id="filter-indicator">Showing: All RSVPs</p>
                </div>
                <!-- <span class="text-sm text-gray-400" id="wishCardLink"></span> -->
                <button id="viewCard"
                    class="bg-green-800 text-white font-semi-bold text-sm py-1.5 px-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 hover:bg-green-500 hover:text-green-900">
                    View Wishes
                </button>
            </div>

            <div class="overflow-x-auto">
                <table id="wishTable" class="min-w-full text-sm text-gray-700">
                    <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
                        <tr>
                            <th class="px-4 py-3 text-left">Guest Name</th>
                            <th class="px-4 py-3 text-left">Wish</th>
                            <th class="px-4 py-3 text-center">Attendance</th>
                            <th class="px-4 py-3 text-center">Pax</th>
                            <th class="px-4 py-3 text-left">Created At</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                    <tfoot class="bg-gray-50 text-gray-600 font-semibold">
                        <tr>
                            <td colspan="3" class="px-4 py-3 text-right">Total Pax:</td>
                            <td class="px-4 py-3 text-center text-lg text-purple-600" id="table-total-pax">0</td>
                            <td class="px-4 py-3"></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <!-- jQuery + DataTables JS -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.7/js/dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/2.0.7/js/dataTables.bootstrap5.min.js"></script>

    <script>
        const CSRF_TOKEN = <?= json_encode($csrf_token) ?>;
        let currentEventId = <?= json_encode($eventId) ?>;
        let currentFilter = 'all'; // Track current filter status
        let wishTable;
        let loadingTimeout;

        // Filter by status function
        function filterByStatus(status) {
            // Show loader
            showLoader();

            // Update current filter
            currentFilter = status;

            // Update active card styling
            document.querySelectorAll('.stat-card').forEach(card => {
                card.classList.remove('active');
            });
            document.getElementById('card-' + status).classList.add('active');

            // Update filter indicator text
            const filterTexts = {
                'all': 'All RSVPs',
                'attending': 'Attending Guests Only',
                'not-attending': 'Not Attending Guests Only',
                'pending': 'Pending Responses Only'
            };
            document.getElementById('filter-indicator').textContent = 'Showing: ' + filterTexts[status];

            // Reload table with filter
            wishTable.ajax.reload(function(json) {
                // Update total pax when filter changes
                if (json.stats && json.stats.totalPax !== undefined) {
                    const totalPaxEl = document.getElementById('total-pax');
                    const tableTotalPaxEl = document.getElementById('table-total-pax');
                    if (totalPaxEl) totalPaxEl.textContent = json.stats.totalPax || 0;
                    if (tableTotalPaxEl) tableTotalPaxEl.textContent = json.stats.totalPax || 0;
                }
                hideLoader();
            }, false);
        }

        // Theme Toggle Function
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Update classes
            html.classList.remove(currentTheme);
            html.classList.add(newTheme);

            // Save to localStorage
            localStorage.setItem('theme', newTheme);

            // Update icon
            document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
        }

        // Initialize theme icon on load
        window.addEventListener('DOMContentLoaded', () => {
            const theme = localStorage.getItem('theme') || 'light';
            document.getElementById('theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
        });

        // Event data mapping
        const eventData = {
            22: {
                name: 'Event 22/11',
                fullName: 'Walimatulurus Syukriah & Faiz',
                date: '22 November 2025'
            },
            29: {
                name: 'Event 29/11',
                fullName: 'Majlis Bertandang',
                date: '29 December 2025'
            }
        };

        function showLoader() {
            document.getElementById('custom-loader').style.display = 'flex';
        }

        function hideLoader() {
            clearTimeout(loadingTimeout);
            // Add a minimum display time for better UX
            loadingTimeout = setTimeout(() => {
                document.getElementById('custom-loader').style.display = 'none';
            }, 400);
        }

        function switchEvent(eventId) {
            // Show loader
            showLoader();

            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('eid', eventId);
            window.history.pushState({}, '', url);

            // Update current event
            currentEventId = eventId;

            // Reset filter to 'all' when switching events
            currentFilter = 'all';
            document.querySelectorAll('.stat-card').forEach(card => {
                card.classList.remove('active');
            });
            document.getElementById('card-all').classList.add('active');

            // Update link in datatable header
            const viewButton = document.getElementById('viewCard');

            const newButton = viewButton.cloneNode(true);
            viewButton.parentNode.replaceChild(newButton, viewButton);

            newButton.addEventListener('click', function() {
                if (eventId === 22) {
                    window.open('https://invite.astrus.my/syukriah-faiz/', '_blank');
                } else if (eventId === 29) {
                    window.open('https://invite.astrus.my/faiz-syukriah/', '_blank');
                }
            });

            // Update button styles
            document.querySelectorAll('.event-btn').forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-700');
            });
            document.getElementById('btn-event-' + eventId).classList.remove('bg-gray-100', 'text-gray-700');
            document.getElementById('btn-event-' + eventId).classList.add('bg-blue-600', 'text-white');

            // Reload DataTable with new event
            wishTable.ajax.reload(function(json) {
                // Update all stat counts
                if (json.stats) {
                    const totalRsvpEl = document.getElementById('total-rsvp');
                    const totalAttendingEl = document.getElementById('total-attending');
                    const totalNotAttendingEl = document.getElementById('total-not-attending');
                    const totalPendingEl = document.getElementById('total-pending');
                    const totalPaxEl = document.getElementById('total-pax');
                    const tableTotalPaxEl = document.getElementById('table-total-pax');

                    if (totalRsvpEl) totalRsvpEl.textContent = json.stats.totalRSVP;
                    if (totalAttendingEl) totalAttendingEl.textContent = json.stats.attending;
                    if (totalNotAttendingEl) totalNotAttendingEl.textContent = json.stats.notAttending;
                    if (totalPendingEl) totalPendingEl.textContent = json.stats.pending;
                    if (totalPaxEl) totalPaxEl.textContent = json.stats.totalPax || 0;
                    if (tableTotalPaxEl) tableTotalPaxEl.textContent = json.stats.totalPax || 0;
                }
                // Hide loader after data is loaded
                hideLoader();
            }, false); // false to keep current page position
        }

        $(document).ready(function() {
            // Loader is already visible from page load

            const viewButton = document.getElementById('viewCard');
            viewButton.addEventListener('click', function() {
                if (currentEventId === 22) {
                    window.open('https://invite.astrus.my/syukriah-faiz/', '_blank');
                } else if (currentEventId === 29) {
                    window.open('https://invite.astrus.my/faiz-syukriah/', '_blank');
                }
            });

            const columns = [{
                data: 'guestName'
            }, {
                data: 'guestWish'
            }, {
                data: 'confirmAttendance',
                className: 'text-center',
                render: function(data, type, row) {
                    if (type === 'display') {
                        if (data === 'y' || data === 'Y') {
                            return '<span class="badge badge-yes">✓ Yes</span>';
                        } else if (data === 'n' || data === 'N') {
                            return '<span class="badge badge-no">✗ No</span>';
                        } else {
                            return '<span class="badge badge-null">— Pending</span>';
                        }
                    }
                    return data;
                }
            }, {
                data: 'attendeesPax',
                className: 'text-center',
                render: function(data, type, row) {
                    if (type === 'display') {
                        if (data === null || data === '' || data === '0') {
                            return '<span class="text-gray-400">—</span>';
                        }
                        return '<span class="font-semibold text-blue-600">' + data + '</span>';
                    }
                    return data;
                }
            }, {
                data: 'createdAt'
            }];

            wishTable = $('#wishTable').DataTable({
                ajax: {
                    url: 'get-report.php',
                    type: 'POST',
                    data: function(d) {
                        d.csrf_token = CSRF_TOKEN;
                        d.eventId = currentEventId;
                        d.filterStatus = currentFilter; // Add filter status
                    },
                    dataSrc: 'data',
                    error: function(xhr, error, thrown) {
                        console.error('DataTables error:', error, thrown);
                        console.error('Response:', xhr.responseText);
                        hideLoader();
                    }
                },
                columns: columns,
                pageLength: 10,
                order: [
                    [4, 'desc']
                ],
                serverSide: true,
                processing: false, // Disable default processing message
                initComplete: function(settings, json) {
                    // Update table footer total pax on init
                    if (json && json.stats && json.stats.totalPax !== undefined) {
                        const tableTotalPaxEl = document.getElementById('table-total-pax');
                        if (tableTotalPaxEl) tableTotalPaxEl.textContent = json.stats.totalPax || 0;
                    }
                    // Hide loader when table is fully initialized
                    hideLoader();
                }
            });

            // Show loader when table is processing (pagination, search, etc.)
            $('#wishTable').on('processing.dt', function(e, settings, processing) {
                if (processing) {
                    showLoader();
                } else {
                    hideLoader();
                }
            });
        });
    </script>
</body>

</html>