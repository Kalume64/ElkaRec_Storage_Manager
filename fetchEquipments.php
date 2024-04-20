<?php
include 'db_connection.php'; // Inclut le fichier contenant les paramètres de connexion à la base de données.

ini_set('display_errors', 0);  // Désactive l'affichage des erreurs pour éviter les fuites d'information en production.
error_reporting(E_ALL);        // Active le reporting de toutes les erreurs PHP (mais elles ne seront pas affichées à l'écran).

header('Content-Type: application/json'); // Définit le type de contenu de la réponse HTTP à JSON pour toutes les réponses.

$sector = isset($_GET['sector']) && $_GET['sector'] !== 'all' ? $_GET['sector'] : null;
$status = isset($_GET['status']) && $_GET['status'] !== 'all' ? $_GET['status'] : null;

$sql = "SELECT * FROM equipments WHERE 1=1"; // Commence la construction de la requête SQL avec une condition toujours vraie.
$params = []; // Initialise un tableau pour stocker les valeurs des paramètres dynamiques de la requête.
$types = ''; // Initialise une chaîne pour stocker les types des paramètres pour la méthode bind_param.

if ($sector) {
    $sql .= " AND sector = ?"; // Ajoute une condition SQL pour le secteur si le paramètre est fourni.
    $params[] = $sector; // Ajoute la valeur de 'sector' au tableau des paramètres.
    $types .= 's'; // Ajoute 's' à la chaîne des types, indiquant que 'sector' est une chaîne.
}

if ($status) {
    $sql .= " AND status = ?"; // Ajoute une condition SQL pour le type si le paramètre est fourni.
    $params[] = $status; // Ajoute la valeur de 'type' au tableau des paramètres.
    $types .= 's'; // Ajoute 's' à la chaîne des types pour 'type'.
}

if (!empty($params)) { // Vérifie si des paramètres ont été ajoutés.
    $stmt = $conn->prepare($sql); // Prépare la requête SQL pour l'exécution.
    if (!$stmt) {
        echo json_encode(['error' => 'Failed to prepare statement']); // Envoie une réponse JSON d'erreur si la préparation échoue.
        exit; // Arrête l'exécution du script.
    }

    $stmt->bind_param($types, ...$params); // Lie les paramètres à la requête préparée avec leurs types.
    $stmt->execute(); // Exécute la requête.
    $result = $stmt->get_result(); // Récupère le résultat de la requête.

} else {
    // Si aucun paramètre n'est spécifié
    $result = $conn->query($sql);
}

    $equipments = []; // Initialise un tableau pour collecter les équipements.
    if ($result) {
        while ($row = $result->fetch_assoc()) {
        $equipments[] = $row; // Ajoute chaque ligne du résultat au tableau d'équipements.
    }
        echo json_encode($equipments); // Convertit le tableau d'équipements en JSON et l'envoie.
} else {
    // Aucun paramètre n'a été spécifié, renvoie une erreur ou un tableau vide.
    echo json_encode(['error' => 'No parameters provided']);
}
?>
