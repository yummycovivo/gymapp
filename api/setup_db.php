<?php
/**
 * api/setup_db.php
 * Eseguire questo script per generare il database e le tabelle la prima volta.
 */

declare(strict_types=1);

$host = '127.0.0.1';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS personal_gym_sql CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE personal_gym_sql");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS pg_templates (
            id BIGINT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exercises JSON NOT NULL
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS pg_history (
            id BIGINT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            start_time BIGINT NOT NULL,
            end_time BIGINT,
            workout_data JSON NOT NULL
        )
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS pg_wger_exercises (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE
        )
    ");

    echo "Database e tabelle creati con successo!";

} catch (PDOException $e) {
    die("DB ERROR: " . $e->getMessage());
}
