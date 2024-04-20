//clic pour secteur
document.querySelector('.sector-arrow').addEventListener('click', function(event) {
    document.getElementById('sectorDropdown').style.display = 'block';
    event.stopPropagation(); // Empêche l'événement de se propager plus loin dans la hiérarchie DOM
});

//clic pour maintenance
document.querySelector('.maintenance-arrow').addEventListener('click', function(event) {
    document.getElementById('maintenanceDropdown').style.display = 'block';
    event.stopPropagation(); // Empêche l'événement de se propager plus loin dans la hiérarchie DOM
});

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-arrow')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

//Gestion de la sélection des boutons des filtres
function setupFilterButtons() {
    document.querySelectorAll('.dropdown-content button').forEach(button => {
        button.addEventListener('click', function() {
            // Retire 'selected' de tous les boutons dans le même conteneur
            this.parentNode.querySelectorAll('button').forEach(btn => {btn.classList.remove('selected');
            });
            this.parentNode.previousElementSibling.classList.remove('active');
            // Ajoute 'selected' au bouton cliqué
            this.classList.add('selected');
            // Vérifie si la valeur sélectionnée est 'all'
            const isAll = this.getAttribute('data-value') === 'all';
            // Trouve la flèche associée au conteneur
            const arrow = this.parentNode.previousElementSibling;
            // Ajoute ou retire la classe 'active' à la flêche en fonction de la valeur du filtre
            if (!isAll) {
                arrow.classList.add('active');
            } else {
                arrow.classList.remove('active');
}
            // Appelle fetchEquipments pour mettre à jour la liste en fonction des filtres actifs
            fetchEquipments();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFilterButtons);