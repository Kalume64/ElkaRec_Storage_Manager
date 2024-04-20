Description
Cette application web permet de gérer le parc matériel audiovisuel et informatique d'une petite entreprise. Elle offre la possibilité de suivre la localisation, l'état de maintenance, et d'autres informations détaillées concernant chaque équipement. L'interface utilisateur permet de filtrer les équipements par secteur d'activité, état de maintenance, et plus encore.

Fonctionnalités
Visualisation du parc matériel : Affiche tous les équipements avec des détails tels que TAG, localisation, secteur, type, constructeur, modèle, et état de maintenance.
Filtrage dynamique : Les utilisateurs peuvent filtrer les équipements par secteur (Broadcast, Événementiel, Informatique) et par état de maintenance (Ready, À réviser, En Maintenance, HS).
Détails et mise à jour : Chaque ligne d'équipement comporte un bouton "VOIR" pour accéder à des détails supplémentaires, et un bouton "Update Status" pour mettre à jour l'état de maintenance. (àvenir)
Conservation des filtres : Les filtres appliqués sont conservés après une actualisation de la page (à venir)

Technologies Utilisées
Frontend : HTML, CSS, JavaScript
Backend : PHP, MySQL
Stockage : Base de données MySQL pour stocker toutes les informations concernant les équipements et leur historique de localisation.
Contrôle de Version : Git et GitHub pour le suivi des modifications et la collaboration

Installation
Pour mettre en place et exécuter cette application localement, suivez les étapes ci-dessous :

Prérequis
Serveur web Apache
PHP (version 7.4 ou plus récente)
MySQL
Navigateur web

Étapes
1- Clonez le dépôt : git clone https://github.com/votre_username/gestion-parc-elkarec.git
cd gestion-parc-elkarec
2- Configurez votre base de données :
Créez une base de données MySQL et importez schema.sql pour configurer la structure de la base de données.
Modifiez les paramètres de connexion à la base de données dans db_connection.php.
3- Lancez votre serveur web :
Placez le projet dans le dossier de votre serveur web.
Assurez-vous que le serveur Apache et MySQL sont en cours d'exécution.
4- Accédez à l'application :
Ouvrez votre navigateur web et naviguez vers http://localhost/chemin_vers_le_projet/.

Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
