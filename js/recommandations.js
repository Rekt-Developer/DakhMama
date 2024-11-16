async function obtenirRecommandations() {
    // Sélectionner les genres de la vidéo actuelle
    const genresElements = document.querySelectorAll(".actor-video-link a");
    if (!genresElements || genresElements.length === 0) {
        console.error("Aucun genre trouvé dans la liste.");
        return [];
    }

    const genresActuels = Array.from(genresElements).map(el => el.title.trim());
    console.log("Genres actuels :", genresActuels);

    // Charger les données JSON
    const response = await fetch("../search/d.json");
    if (!response.ok) {
        console.error("Erreur lors du chargement du fichier JSON :", response.statusText);
        return [];
    }
    const videos = await response.json();
    console.log("Vidéos chargées :", videos);

    // Chemin de la vidéo actuelle
    const videoActuelle = window.location.pathname;

    // Filtrer et trier les vidéos par genres communs
    const recommandations = videos
        .filter(video => video.emplacement !== videoActuelle) // Exclure la vidéo actuelle
        .map(video => {
            const genresEnCommun = genresActuels.filter(genre => video.genre?.includes(genre));
            return { ...video, genresEnCommun: genresEnCommun.length }; // Ajouter le nombre de genres communs
        })
        .filter(video => video.genresEnCommun > 0) // Garder seulement les vidéos avec au moins 1 genre en commun
        .sort((a, b) => b.genresEnCommun - a.genresEnCommun); // Trier par priorité

    console.log("Recommandations finales :", recommandations);
    return recommandations.slice(0, 4); // Limiter à 4 suggestions
}

async function afficherRecommandations() {
    const recommandations = await obtenirRecommandations();
    const conteneur = document.getElementById("recommandations-list");

    if (recommandations.length === 0) {
        conteneur.innerHTML = "<p>Aucune recommandation disponible.</p>";
        return;
    }

    recommandations.forEach(video => {
        const element = `
            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-12 col-6">
                <div class="single-video">
                    <a href="${video.emplacement}" title="${video.nom}">
                        <div class="video-img">
                            <span class="video-item-content">${video.nom}</span>
                            <img src="${video.affiche}" alt="${video.nom}" title="${video.nom}">
                        </div>
                    </a>
                </div>
            </div>
        `;
        conteneur.innerHTML += element;
    });
}

// Appeler la fonction pour afficher les recommandations
afficherRecommandations();
