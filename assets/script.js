let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";
let galerieContainer = document.querySelector(".gallery");
let filtersContainer = document.getElementById("filters");
let allButton = document.querySelector(".btn-tous");
let galerieModale = document.querySelector(".galerie");
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
  const modifierButton = document.querySelector(".modifier-button");
  const modifierButtonLogo = document.querySelector(".fa-pen-to-square");

  if (authToken) {
    // L'utilisateur est connecté
    document.getElementById("login-item").innerHTML =
      '<a href="#" class="login-index">log-out</a>';

    // Masque les filtres
    filtersContainer.style.display = "none";

    // Affiche le bouton "modifier" lorsque l'utilisateur est connecté
    modifierButton.style.display = "block";
    modifierButtonLogo.style.display = "block";
  } else {
    // L'utilisateur n'est pas connecté
    document.getElementById("login-item").innerHTML =
      '<a href="/assets/login.html" class="login-index">login</a>';

    // Affiche les filtres
    filtersContainer.style.display = "flex";

    // Masque le bouton "modifier" lorsque l'utilisateur n'est pas connecté
    modifierButton.style.display = "none";
    modifierButtonLogo.style.display = "none";
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

// Affichage modale

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

// Ajoute de la galerie dans la modale

const btnModifier = document.querySelector(".modifier-button");

btnModifier.addEventListener("click", () => {
  galerieModale.innerHTML = allProjects
    .map((projet) => {
      return `<div class= "galerie-content">
    <img src= "${projet.imageUrl}">
    <span class= "delete-img"><i class="fa-solid fa-trash-can"></i></span>
    <p class= "editer">éditer</p>
    </div>`;
    })
    .join("");

  const deleteButtons = document.querySelectorAll(".delete-img");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", deleteImage)
  );
});

function deleteImage(event) {
  const imageId = event.target.getAttribute("id");
}

// Dataset permet de mettre des id (ou d'autres données) dans un élément html
// Quand click sur poubelle = regardé le dataset de l'image cliqué
