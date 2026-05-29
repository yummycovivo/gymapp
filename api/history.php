<?php
/**
 * api/history.php
 * Endpoint REST per lo storico allenamenti.
 */

declare(strict_types=1);
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDatabaseConnection();

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM pg_history ORDER BY start_time DESC");
            $rows = $stmt->fetchAll();
            // Ricostruiamo la struttura attesa dal frontend
            $history = array_map(function ($row) {
                $data = json_decode($row['workout_data'], true);
                return $data; // l'oggetto completo
            }, $rows);
            sendSuccess($history);
        } catch (PDOException $e) {
            sendError("Failed to fetch history: " . $e->getMessage(), 500);
        }
        break;

    case 'POST':
        $data = getRequestData();
        $action = $_GET['action'] ?? '';

        if ($action === 'add') {
            if (!isset($data['id'], $data['name'], $data['startTime'])) {
                sendError("Dati mancanti per l'allenamento.");
            }

            try {
                $stmt = $pdo->prepare("INSERT INTO pg_history (id, name, start_time, end_time, workout_data) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['id'],
                    $data['name'],
                    $data['startTime'],
                    $data['endTime'] ?? null,
                    json_encode($data)
                ]);
                sendSuccess();
            } catch (PDOException $e) {
                sendError("Impossibile salvare allenamento: " . $e->getMessage(), 500);
            }
        } elseif ($action === 'delete') {
            if (!isset($data['id']))
                sendError("ID mancante");
            try {
                $stmt = $pdo->prepare("DELETE FROM pg_history WHERE id = ?");
                $stmt->execute([$data['id']]);
                sendSuccess();
            } catch (PDOException $e) {
                sendError("Impossibile eliminare allenamento: " . $e->getMessage(), 500);
            }
        } else {
            sendError("Action non supportata");
        }
        break;
}
