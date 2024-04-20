<?php
$conn = new mysqli("localhost", "*******", "*******", "*******");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
