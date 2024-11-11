// Redirige vers la page de maintenance si l'URL n'est pas déjà celle de maintenance
if (!window.location.pathname.includes("../index.html")) {
    window.location.href = "../index.html"; // Utilise le chemin relatif pour éviter une redirection absolue
}
