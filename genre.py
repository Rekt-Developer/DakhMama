import json
import os
from bs4 import BeautifulSoup

def ajouter_genres_au_json(fichier_json, chemin_racine):
    # Charger le fichier JSON
    with open(fichier_json, 'r', encoding='utf-8') as f:
        films = json.load(f)
    
    # Parcourir les films
    for film in films:
        emplacement = film.get("emplacement")
        if not emplacement:
            print(f"Emplacement manquant pour le film : {film['nom']}")
            continue
        
        # Résoudre le chemin absolu de l'emplacement
        chemin_absolu = os.path.join(chemin_racine, emplacement.replace("../", "").replace("/", os.sep))
        if not os.path.exists(chemin_absolu):
            print(f"Fichier HTML non trouvé pour le film : {film['nom']} (chemin : {chemin_absolu})")
            continue

        # Lire le contenu du fichier HTML
        with open(chemin_absolu, 'r', encoding='utf-8') as f:
            contenu_html = f.read()
        
        # Analyser le HTML avec BeautifulSoup
        soup = BeautifulSoup(contenu_html, 'html.parser')
        genres_elements = soup.select('li > a[title]')
        genres = [genre['title'] for genre in genres_elements]
        
        # Ajouter les genres au film
        if genres:
            film['genre'] = genres
            print(f"Genres ajoutés pour {film['nom']}: {genres}")
        else:
            print(f"Aucun genre trouvé pour le film : {film['nom']}")
    
    # Sauvegarder le fichier JSON mis à jour
    with open(fichier_json, 'w', encoding='utf-8') as f:
        json.dump(films, f, ensure_ascii=False, indent=4)
        print(f"Fichier JSON mis à jour : {fichier_json}")

# Spécifier le chemin du fichier JSON et le chemin racine
fichier_json = 'search/d.json'
chemin_racine = r'C:\Users\aamar\Documents\VScode\Crimson'

# Appeler la fonction pour ajouter les genres
ajouter_genres_au_json(fichier_json, chemin_racine)
