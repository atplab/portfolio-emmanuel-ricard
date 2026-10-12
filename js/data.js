/*
 * Charge les données des projets depuis projects.json et expose une promesse
 * globale utilisée par main.js pour générer les cartes et les pages détaillées.
 */
window.projectsDataPromise = fetch('./data/projects.json?v=1')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Impossible de charger data/projects.json: ${response.status}`);
    }
    return response.json();
  });