<?php

require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-cache, no-store, must-revalidate');

if (isset($_POST['guestName'], $_POST['guestWish'], $_POST['eventId'])) {
    $guestName = trim($_POST['guestName']);
    $guestWish = trim($_POST['guestWish']);
    $eventId = (int)$_POST['eventId'];

    if (empty($guestName) || empty($guestWish)) {
        echo json_encode(['success' => false, 'message' => 'Nama dan ucapan tidak boleh kosong.']);
        exit;
    }

    $attendeesPax = isset($_POST['attendeesPax']) ? (int)$_POST['attendeesPax'] : null;

    if ($attendeesPax === null) {
        $sql = "INSERT INTO wish (eventId, guestName, guestWish) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iss", $eventId, $guestName, $guestWish);
    } else {
        $sql = "INSERT INTO wish (eventId, guestName, guestWish, attendeesPax) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("issi", $eventId, $guestName, $guestWish, $attendeesPax);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Terima kasih atas ucapannya!', 'eventId' => $eventId]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Opps! Ada masalah sikit']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap.']);
    exit;
}
$conn->close();
