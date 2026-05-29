<?php
/**
 * api/exercises.php
 * Ritorna tutti gli esercizi salvati localmente.
 */

declare(strict_types=1);
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDatabaseConnection();

if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT name FROM pg_wger_exercises ORDER BY name ASC");
        $exercises = $stmt->fetchAll(PDO::FETCH_COLUMN);
        sendSuccess($exercises);
    } catch (PDOException $e) {
        sendError("Impossibile recuperare gli esercizi: " . $e->getMessage(), 500);
    }
} else {
    sendError("Metodo non consentito", 405);
}
