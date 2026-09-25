window.projectsDataPromise = fetch('./data/projects.json?v=1')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Impossible de charger data/projects.json: ${response.status}`);
    }
    return response.json();
  });