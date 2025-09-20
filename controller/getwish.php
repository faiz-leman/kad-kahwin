<?php

require_once __DIR__ . '/db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Cache-Control: no-cache, no-store, must-revalidate');

$eventId = isset($_GET['eid']) ? (int)$_GET['eid'] : 1;

$sql = "SELECT guestName, guestWish FROM wish WHERE eventId = ? ORDER BY createdAt DESC LIMIT 20";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $eventId);
$stmt->execute();
$result = $stmt->get_result();

$wishes = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $wishes[] = $row;
    }
}

echo json_encode($wishes);
