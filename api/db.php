<?php
/**
 * api/db.php
 * Connessione al database MySQL tramite PDO.
 */

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'personal_gym_sql');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

function getDatabaseConnection(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            "mysql:host=%s;dbname=%s;charset=%s",
            DB_HOST,
            DB_NAME,
            DB_CHARSET
        );

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            sendError('Database connection failed. Assicurati di aver lanciato setup_db.php o che XAMPP MySQL sia attivo.', 500);
        }
    }

    return $pdo;
}

function sendSuccess(mixed $data = null): void
{
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => true,
        'data' => $data
    ]);
    exit;
}

function sendError(string $message, int $code = 400): void
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'error' => $message
    ]);
    exit;
}

function getRequestData(): array
{
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?: [];
}
