<?php
/**
 * api/templates.php
 * Endpoint REST per i Gym Days (Schede).
 */

declare(strict_types=1);
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDatabaseConnection();

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM pg_templates ORDER BY id ASC");
            $rows = $stmt->fetchAll();
            $templates = array_map(function ($row) {
                return [
                    'id' => (int) $row['id'],
                    'name' => $row['name'],
                    'exercises' => json_decode($row['exercises'], true) ?: []
                ];
            }, $rows);
            sendSuccess($templates);
        } catch (PDOException $e) {
            sendError("Failed to fetch templates: " . $e->getMessage(), 500);
        }
        break;

    case 'POST':
        $data = getRequestData();
        $action = $_GET['action'] ?? '';

        if ($action === 'save_all') {
            // Riceviamo l'intero array e lo sincronizziamo (approccio semplice)
            if (!is_array($data))
                sendError("Dati non validi");

            try {
                $pdo->beginTransaction();
                $pdo->exec("TRUNCATE TABLE pg_templates");

                $stmt = $pdo->prepare("INSERT INTO pg_templates (id, name, exercises) VALUES (?, ?, ?)");
                foreach ($data as $tpl) {
                    $stmt->execute([
                        $tpl['id'],
                        $tpl['name'],
                        json_encode($tpl['exercises'] ?? [])
                    ]);
                }
                $pdo->commit();
                sendSuccess();
            } catch (PDOException $e) {
                $pdo->rollBack();
                sendError("Impossibile salvare schede: " . $e->getMessage(), 500);
            }
        } else {
            sendError("Action non supportata");
        }
        break;
}
