<?php
/**
 * api/sync_wger.php
 * Eseguire una volta sola per scaricare gli esercizi da WGER e salvarli in locale.
 */

declare(strict_types=1);
require_once __DIR__ . '/db.php';

$wgerApiUrl = 'https://wger.de/api/v2/exerciseinfo/?language=2&limit=500';
echo "Scaricando esercizi da WGER...\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $wgerApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    die("Errore: Impossibile contattare wger.de");
}

$data = json_decode($response, true);
if (!isset($data['results'])) {
    die("Errore nel formato JSON ricevuto.");
}

$pdo = getDatabaseConnection();

try {
    // Svuotiamo la tabella fuori dalla transazione (TRUNCATE esegue commit implicito)
    $pdo->exec("TRUNCATE TABLE pg_wger_exercises");

    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT IGNORE INTO pg_wger_exercises (name) VALUES (?)");
    $count = 0;

    foreach ($data['results'] as $ex) {
        if (!empty($ex['translations']) && isset($ex['translations'][0]['name'])) {
            $name = $ex['translations'][0]['name'];
            $stmt->execute([$name]);
            if ($stmt->rowCount() > 0) {
                $count++;
            }
        } elseif (!empty($ex['name'])) {
            // Fallback se non ci sono traduzioni ma c'è un nome base
            $stmt->execute([$ex['name']]);
            if ($stmt->rowCount() > 0) {
                $count++;
            }
        }
    }

    $pdo->commit();
    echo "Sincronizzazione completata con successo! Salvati $count esercizi nel database locale.\n";

} catch (PDOException $e) {
    $pdo->rollBack();
    die("Errore DB: " . $e->getMessage());
}
