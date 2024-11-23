
async function showSuggestions(query) {
  const searchOutput = document.getElementById('search_output');
  searchOutput.innerHTML = ''; // Réinitialiser les résultats

  if (!query) return; // Si la requête est vide, ne rien faire

  const response = await fetch('../search/d.json');
  const movies = await response.json();

  const filteredMovies = movies.filter(movie => movie.nom.toLowerCase().includes(query.toLowerCase()));

  if (filteredMovies.length > 0) {
      filteredMovies.forEach(movie => {
          const movieDiv = document.createElement('div');
          movieDiv.classList.add('single-video');
          movieDiv.innerHTML = `
              <a href="${movie.emplacement}">
                  <div class="video-img">
                      <span class="video-item-content">${movie.nom}</span>
                      <img src="${movie.affiche}" alt="${movie.nom}">
                  </div>
              </a>
          `;
          searchOutput.appendChild(movieDiv);
      });
  } else {
      searchOutput.innerHTML = '<p>Aucun résultat trouvé.</p>';
  }
}
