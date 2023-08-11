let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";
let galerieContainer = document.querySelector(".gallery");
let filtersContainer = document.getElementById("filters");
let allButton = document.querySelector(".btn-tous");

let allProjects = [];

fetch(urlWorks)
  .then((response) => response.json())
  .then((data) => {
    allProjects = data;

    displayProjets(allProjects);
  })
  .catch((error) => {
    console.error(error);
  });

function displayProjets(filteredProjects) {
  galerieContainer.innerHTML = "";

  filteredProjects.forEach((projet) => {
    let imageURL = projet.imageUrl;
    let nom = projet.title;

    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    image.src = imageURL;
    image.alt = nom;
    figcaption.textContent = nom;

    figure.appendChild(image);
    figure.appendChild(figcaption);
    galerieContainer.appendChild(figure);
  });
}

// Récupérer les catégories depuis l'API
fetch(urlCategories)
  .then((response) => response.json())
  .then((categories) => {
    // Ajouter un gestionnaire d'événements pour le bouton "Tous" (statique)
    allButton.addEventListener("click", () => {
      // Supprimer la classe "active" de tous les boutons de filtre
      const allButtons = document.querySelectorAll(".filter-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Ajouter la classe "active" au bouton "Tous"
      allButton.classList.add("active");

      // Appeler la fonction pour afficher tous les projets
      displayProjets(allProjects);
    });

    // Créer dynamiquement les autres boutons de filtre
    categories.forEach((categorie) => {
      const btn = document.createElement("a");
      btn.textContent = categorie.name;
      btn.classList.add(
        "filter-btn",
        `btn-${categorie.name.toLowerCase().replace(/\s+/g, "-")}`
      );
      filtersContainer.appendChild(btn);

      // Ajouter un gestionnaire d'événements à chaque bouton de filtre
      btn.addEventListener("click", () => {
        // Supprimer la classe "active" de tous les boutons de filtre
        const allButtons = document.querySelectorAll(".filter-btn");
        allButtons.forEach((btn) => {
          btn.classList.remove("active");
        });

        // Ajouter la classe "active" au bouton cliqué
        btn.classList.add("active");

        // Filtrer les projets par catégorie
        const filteredProjects = allProjects.filter(
          (projet) => projet.categoryId === categorie.id
        );

        // Appele la fonction pour afficher les projets filtrés
        displayProjets(filteredProjects);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Fonction pour vérifier si l'utilisateur est connecté
function checkLoggedIn() {
  const authToken = localStorage.getItem("authToken");
  const filtersContainer = document.getElementById("filters");
  const modifierButton = document.querySelector(".modifier-button"); // Ajout de cette ligne

  if (authToken) {
    // L'utilisateur est connecté
    document.getElementById("login-item").innerHTML =
      '<a href="#" class="login-index">log-out</a>';

    // Masque les filtres
    filtersContainer.style.display = "none";

    // Affiche le bouton "modifier" lorsque l'utilisateur est connecté
    modifierButton.style.display = "block"; // Ajout de cette ligne
  } else {
    // L'utilisateur n'est pas connecté
    document.getElementById("login-item").innerHTML =
      '<a href="/assets/login.html" class="login-index">login</a>';

    // Affiche les filtres
    filtersContainer.style.display = "flex";

    // Masque le bouton "modifier" lorsque l'utilisateur n'est pas connecté
    modifierButton.style.display = "none"; // Ajout de cette ligne
  }
}

// Exécute la fonction pour vérifier l'état de connexion lors du chargement de la page
checkLoggedIn();

// Écouteur d'événement pour le clic sur le bouton "log-out"
document.getElementById("login-item").addEventListener("click", (event) => {
  event.preventDefault(); // Empêche le comportement par défaut du lien
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    // Si l'utilisateur est connecté, effectuez le logout
    localStorage.removeItem("authToken");
    checkLoggedIn(); // Mise à jour de l'affichage du bouton login/log-out
  } else {
    // Redirection vers la page de connection
    window.location.href = "/assets/login.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Ouvrir la modale lorsque le bouton "modifier" est cliqué
  document.getElementById("btn-modifier").addEventListener("click", () => {
    document.getElementById("modal").style.display = "block";
  });

  // Fermer la modale lorsque l'utilisateur clique sur la croix ou en dehors de la modale
  document.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal || event.target.id === "close-modal") {
      modal.style.display = "none";
    }
  });

  // Autres fonctionnalités de la modale (ajout/suppression de projets, etc.)
});

// Fonction pour afficher les projets dans la modale
function displayProjectsInModal(projects) {
  const modalProjectsContainer = document.getElementById("modal-projects");
  modalProjectsContainer.innerHTML = ""; // Effacer le contenu existant

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project", "modal-project");

    const projectImage = document.createElement("img");
    projectImage.src = project.imageUrl;
    projectImage.alt = project.title;

    const projectName = document.createElement("h3");
    projectName.textContent = project.title;

    // Ajouter d'autres éléments HTML pour afficher les détails du projet, par exemple la description, etc.

    projectDiv.appendChild(projectImage);
    projectDiv.appendChild(projectName);
    modalProjectsContainer.appendChild(projectDiv);
  });
}

// Fonction pour afficher les projets dans la modale
function displayProjectsInModal(projects) {
  const modalProjectsContainer = document.getElementById("modal-projects");
  modalProjectsContainer.innerHTML = ""; // Effacer le contenu existant

  projects.forEach((project) => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project", "modal-project");

    const projectImage = document.createElement("img");
    projectImage.src = project.imageUrl;
    projectImage.alt = project.title;

    const projectName = document.createElement("h3");
    projectName.textContent = project.title;

    // Ajouter d'autres éléments HTML pour afficher les détails du projet, par exemple la description, etc.

    projectDiv.appendChild(projectImage);
    projectDiv.appendChild(projectName);
    modalProjectsContainer.appendChild(projectDiv);
  });
}

document.getElementById("btn-modifier").addEventListener("click", async () => {
  document.getElementById("modal").style.display = "block";

  // Désactiver le défilement de la page principale
  document.body.style.overflow = "hidden";

  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des projets");
    }
    const projects = await response.json();

    displayProjectsInModal(projects);
  } catch (error) {
    console.error(error);
  }
});

// Affichage modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}
