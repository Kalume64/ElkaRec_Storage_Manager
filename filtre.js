//lorsque la page est chargée on affiche tous les équipements de la base
document.addEventListener('DOMContentLoaded', function() {
    fetchEquipments();
});
//------------------------------------------------------------------------------------------------------------------------------------

//Anciens filtres
// Attache des écouteurs d'événements aux filtres pour rafraîchir la liste des équipements quand les filtres changent.
//document.getElementById('sectorFilter').addEventListener('change', function() {
    //fetchEquipments(); // Rafraîchir les équipements quand le secteur change.
//});

//document.getElementById('MaintenanceFilter').addEventListener('change', function() {
    //fetchEquipments(); // Rafraîchir les équipements quand le statut de maintenance change.
//});

//---------------------------------------------------------------------------------------------------------------------------------
// Fonction pour récupérer et afficher les équipements selon les filtres appliqués.
function fetchEquipments() {
    console.log("Update equipments...");
    const sector = document.querySelector('#sectorDropdown .selected').getAttribute('data-value'); //récupère la valeur du filtre sélectionné si y a rien on met all
    const status = document.querySelector('#maintenanceDropdown .selected').getAttribute('data-value');//récupère la valeur du filtre sélectionné si y a rien on met all

    console.log(`Sector: ${sector}, Status: ${status}`); 
    console.log(`URL: fetchEquipments.php?sector=${sector}&status=${status}`); // Vérifier l'URL générée


    // Envoi de la requête pour récupérer les équipements filtrés.
    fetch(`fetchEquipments.php?sector=${sector}&status=${status}`)
        .then(response => response.json()) // Convertir la réponse en JSON.
        .then(data => {
            const tableBody = document.getElementById('equipmentTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Nettoyer le contenu existant du tbody.
            data.forEach(equipment => { // Itérer sur chaque équipement retourné par le serveur.
                const row = tableBody.insertRow(); // Insérer une nouvelle ligne dans le tbody.
                // Insérer les données de chaque équipement dans les cellules de la ligne.
                row.innerHTML = `<td>${equipment.tag}</td>
                                 <td>${equipment.localisation}</td>
                                 <td>${equipment.sector}</td>
                                 <td>${equipment.type}</td>
                                 <td>${equipment.manufacturer}</td>
                                 <td>${equipment.model}</td>
                                 <td>${equipment.status}</td>
                                 <td><button onclick="showUpdateStatusModal(${equipment.id})">Update Status</button></td>`;
            });
        });
}
//---------------------------------------------------------------------------------------------------------------------------------

// Fonction pour afficher un formulaire modal pour mettre à jour le statut de l'équipement.
function showUpdateStatusModal(equipmentId) {
    // Construction du formulaire HTML pour la mise à jour du statut.
    const modalHtml = `
        <form onsubmit="submitStatusUpdate(${equipmentId}); return false;">
            <label for="newStatus">New Status:</label>
            <select id="newStatus">
                <option value="Ready">Ready</option>
                <option value="HS">HS</option>
                <option value="A_réviser">À réviser</option>
                <option value="En_Maintenance">En Maintenance</option>
            </select>
            <label for="description">Description:</label>
            <input type="text" id="description" required>
            <button type="submit">Submit</button>
        </form>
        <button onclick="closeModal()">Close</button>
    `;
    // Affichage du formulaire dans un élément modal.
    document.getElementById('statusUpdateModal').innerHTML = modalHtml;
    document.getElementById('statusUpdateModal').style.display = 'block';
}
//---------------------------------------------------------------------------------------------------------------------------------

// Fonction pour soumettre le formulaire de mise à jour du statut et fermer le modal.
function submitStatusUpdate(equipmentId) {
    const newStatus = document.getElementById('newStatus').value;
    const description = document.getElementById('description').value;

    // Envoi de la mise à jour à un script PHP via une requête POST.
    fetch(`updateEquipmentStatus.php?equipmentId=${equipmentId}&status=${newStatus}&description=${description}`, {
        method: 'POST'
    }).then(response => response.json())
      .then(data => {
        console.log('Update successful', data);
        fetchEquipments(); // Rafraîchir la liste des équipements.
        closeModal(); // Fermer le modal.
    }).catch(error => console.error('Error updating status:', error));
}
//---------------------------------------------------------------------------------------------------------------------------------

// Fonction pour fermer le formulaire modal.
function closeModal() {
    document.getElementById('statusUpdateModal').style.display = 'none';
}
//---------------------------------------------------------------------------------------------------------------------------------

// Fonction pour afficher les détails d'un équipement spécifique dans une nouvelle fenêtre.
function viewDetails(id) {
    window.open(`equipmentDetails.html?id=${id}`, '_blank');
}