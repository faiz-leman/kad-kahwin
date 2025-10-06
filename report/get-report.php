<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

if (empty($_POST['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
}

require_once __DIR__ . '/config.php';

// Get eventId - default to 22 if not provided
$eventId = isset($_POST['eventId']) && $_POST['eventId'] !== '' && $_POST['eventId'] !== 'null'
    ? (int)$_POST['eventId']
    : 22;

$start = isset($_POST['start']) ? (int)$_POST['start'] : 0;
$length = isset($_POST['length']) ? (int)$_POST['length'] : 10;
if ($length < 1 || $length > 100) $length = 10;

// Get filter status
$filterStatus = isset($_POST['filterStatus']) ? $_POST['filterStatus'] : 'all';

$search = '';
if (!empty($_POST['search']['value'])) {
    $search = trim($_POST['search']['value']);
}

// Always filter by eventId
$whereSql = 'WHERE eventId = ?';
$params = [$eventId];
$types = 'i';

// Add status filter
if ($filterStatus === 'attending') {
    $whereSql .= " AND confirmAttendance = 'y'";
} elseif ($filterStatus === 'not-attending') {
    $whereSql .= " AND confirmAttendance = 'n'";
} elseif ($filterStatus === 'pending') {
    $whereSql .= " AND (confirmAttendance IS NULL OR confirmAttendance = '')";
}
// 'all' means no additional filter

// Add search condition
if ($search !== '') {
    $safeSearch = str_replace(['%', '_'], ['\\%', '\\_'], $search);
    $like = "%{$safeSearch}%";
    $whereSql .= " AND (guestName LIKE ? OR guestWish LIKE ? OR confirmAttendance LIKE ?)";
    $params[] = $like;
    $params[] = $like;
    $params[] = $like;
    $types .= 'sss';
}

// Count total
$total = 0;
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish $whereSql")) {
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $stmt->bind_result($total);
    $stmt->fetch();
    $stmt->close();
}

// Get statistics for this event (without search filter)
$stats = [
    'totalRSVP' => 0,
    'attending' => 0,
    'notAttending' => 0,
    'pending' => 0
];

// Total RSVP for event
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ?")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['totalRSVP']);
    $stmt->fetch();
    $stmt->close();
}

// Attending count
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND confirmAttendance = 'y'")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['attending']);
    $stmt->fetch();
    $stmt->close();
}

// Not attending count
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND confirmAttendance = 'n'")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['notAttending']);
    $stmt->fetch();
    $stmt->close();
}

// Pending count
if ($stmt = $conn->prepare("SELECT COUNT(*) FROM wish WHERE eventId = ? AND (confirmAttendance IS NULL OR confirmAttendance = '')")) {
    $stmt->bind_param("i", $eventId);
    $stmt->execute();
    $stmt->bind_result($stats['pending']);
    $stmt->fetch();
    $stmt->close();
}

// Fetch rows - including attendance and pax columns
$sql = "SELECT guestName, guestWish, confirmAttendance, attendeesPax, 
        DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s') AS createdAt
        FROM wish $whereSql ORDER BY createdAt DESC LIMIT ?, ?";
if ($stmt = $conn->prepare($sql)) {
    $types .= 'ii';
    $params[] = $start;
    $params[] = $length;
    $stmt->bind_param($types, ...$params);

    $stmt->execute();
    $res = $stmt->get_result();
    $data = [];
    while ($r = $res->fetch_assoc()) {
        $data[] = [
            'guestName' => htmlspecialchars($r['guestName'], ENT_QUOTES, 'UTF-8'),
            'guestWish' => htmlspecialchars($r['guestWish'], ENT_QUOTES, 'UTF-8'),
            'confirmAttendance' => $r['confirmAttendance'],
            'attendeesPax' => $r['attendeesPax'],
            'createdAt' => $r['createdAt']
        ];
    }
    $stmt->close();
}

$conn->close();

echo json_encode([
    'recordsTotal' => $total,
    'recordsFiltered' => $total,
    'data' => $data,
    'stats' => $stats
]);
exit;
