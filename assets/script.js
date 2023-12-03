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
    // Ajoute un gestionnaire d'événements pour le bouton "Tous" (statique)
    allButton.addEventListener("click", () => {
      // Supprime la classe "active" de tous les boutons de filtre
      const allButtons = document.querySelectorAll(".filter-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Ajoute la classe "active" au bouton "Tous"
      allButton.classList.add("active");

      // Appele la fonction pour afficher tous les projets
      displayProjets(allProjects);
    });

    // Crée dynamiquement les autres boutons de filtre
    categories.forEach((categorie) => {
      const btn = document.createElement("a");
      btn.textContent = categorie.name;
      btn.classList.add(
        "filter-btn",
        `btn-${categorie.name.toLowerCase().replace(/\s+/g, "-")}`
      );
      filtersContainer.appendChild(btn);

      // Ajoute un gestionnaire d'événements à chaque bouton de filtre
      btn.addEventListener("click", () => {
        // Supprime la classe "active" de tous les boutons de filtre
        const allButtons = document.querySelectorAll(".filter-btn");
        allButtons.forEach((btn) => {
          // btn.classList.remove("active");
          btn.classList.remove("selected-filter");
        });

        // Ajoute la classe "active" au bouton cliqué
        // btn.classList.add("active");
        btn.classList.add("selected-filter");

        // Filtre les projets par catégorie
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

const btnAll = document.querySelector(".btn-tous");
btnAll.addEventListener("click", () => {
  displayProjets(allProjects);
  const allButtons = document.querySelectorAll(".filter-btn");
  allButtons.forEach((btn) => {
    // btn.classList.remove("active");
    btn.classList.remove("selected-filter");
  });
  btnAll.classList.add("selected-filter");
});

// Fonction pour vérifier si l'utilisateur est connecté
function checkLoggedIn() {
  const authToken = localStorage.getItem("authToken");
  const filtersContainer = document.getElementById("filters");
  const modifierButton = document.querySelector(".modifier-button");
  const modifierButtonLogo = document.querySelector(
    ".modifier .fa-pen-to-square"
  );
  const connectedBar = document.getElementById("connected-bar");

  if (authToken) {
    // L'utilisateur est connecté
    document.getElementById("login-item").innerHTML =
      '<a href="#" class="login-index">log-out</a>';

    // Masque les filtres
    filtersContainer.style.display = "none";

    // Affiche le bouton "modifier" lorsque l'utilisateur est connecté
    modifierButton.style.display = "block";
    modifierButtonLogo.style.display = "block";
    connectedBar.style.display = "block";
  } else {
    // L'utilisateur n'est pas connecté
    document.getElementById("login-item").innerHTML =
      '<a href="/assets/login.html" class="login-index">login</a>';

    // Affiche les filtres
    filtersContainer.style.display = "flex";

    // Masque le bouton "modifier" lorsque l'utilisateur n'est pas connecté
    modifierButton.style.display = "none";
    modifierButtonLogo.style.display = "none";
    connectedBar.style.display = "none";
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

const modalContainers = document.querySelectorAll(".modal-container-1");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => {
    clearForm();
    toggleModal();
  })
);

function toggleModal() {
  modalContainers.forEach((container) => {
    container.classList.toggle("active");
  });
}

// Switch modal 1 à modal 2

const modalContainers2 = document.querySelectorAll(".modal-container-2");
const buttonAjoutPhoto = document.querySelector(".ajout-photo");

buttonAjoutPhoto.addEventListener("click", toggleModal2);

function toggleModal2() {
  modalContainers.forEach((container) => {
    container.classList.remove("active");
  });
  modalContainers2.forEach((container) => {
    container.classList.toggle("active");
  });
}

// Fermeture des modales

const closeModal1 = document.querySelector("#modal-container-1 .close-modal");
const closeModal2 = document.querySelector("#modal-container-2 .close-modal");
const overlay1 = document.querySelector("#modal-container-1 .overlay");
const overlay2 = document.querySelector("#modal-container-2 .overlay");

closeModal1.addEventListener("click", () => {
  const modal1 = document.getElementById("modal-container-1");
  modal1.classList.remove("active");
});

closeModal2.addEventListener("click", () => {
  const modal2 = document.getElementById("modal-container-2");
  modal2.classList.remove("active");
});

overlay1.addEventListener("click", () => {
  const modal1 = document.getElementById("modal-container-1");
  modal1.classList.remove("active");
});

overlay2.addEventListener("click", () => {
  const modal2 = document.getElementById("modal-container-2");
  modal2.classList.remove("active");
});

// Ajout de la galerie dans la modale

const btnModifier = document.querySelector(".modifier-button");

btnModifier.addEventListener("click", () => {
  displayGalerie();
});

function displayGalerie() {
  galerieModale.innerHTML = allProjects
    .map((projet) => {
      return `<div class="galerie-content">
        <img src="${projet.imageUrl}">
        <span class="delete-img"  data-id="${projet.id}">
        <i class="fa-solid fa-trash-can" data-id="${projet.id}"></i>
        </span>
        <p class="editer">éditer</p>
      </div>`;
    })
    .join("");
  const deleteButtons = document.querySelectorAll(".delete-img");
  deleteButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      deleteImage(event);
    })
  );
}

async function deleteImage(event) {
  const idPictures = parseInt(event.target.dataset.id);
  console.log(idPictures);
  try {
    await fetch(`http://localhost:5678/api/works/${idPictures}`, {
      method: "DELETE",
      headers: {
        Authorization: `Berear ${localStorage.getItem("authToken")}`,
      },
    });
    allProjects = allProjects.filter((project) => {
      return project.id != idPictures;
    });
    displayGalerie();
    displayProjets(allProjects);
  } catch (error) {
    console.log(error);
  }
}

// Filtre dynamique

const categorySelect = document.querySelector("#category");

async function loadCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    data.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des catégories:", error);
  }
}

loadCategories();

// Ajout de photo

let ajoutPhotoButton = document.querySelector(".button-ajout-photo");
let previewImage;
let file = null;
const ajoutContent = document.querySelector(".ajout-content");
const validationButton = document.querySelector(".validation");

function managePhotoButton() {
  ajoutPhotoButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/jpeg,image/png";
    fileInput.addEventListener("change", handleFileSelect);
    fileInput.click();
    const titleInput = document.querySelector("#title");
    const categorySelect = document.querySelector("#category");
    titleInput.addEventListener("change", () => {
      validateForm();
    });
    categorySelect.addEventListener("change", () => {
      validateForm();
    });
  });
}
managePhotoButton();

function clearForm() {
  const titleInput = document.querySelector("#title");
  console.log("clear");
  titleInput.value = "";
  if (document.querySelector(".miniature-image")) {
    document.querySelector(".miniature-image").remove();
    const ajoutContent = document.querySelector(".ajout-content");
    ajoutContent.innerHTML = `<i class="fa-regular fa-image"></i>
    <button class="button-ajout-photo">+ Ajout photo</button>
    <p class="info-photo">jpg, png : 4mo max</p>`;
    ajoutPhotoButton = document.querySelector(".button-ajout-photo");
    managePhotoButton();
  }
}

function handleFileSelect(event) {
  file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.createElement("img");
      previewImage.src = e.target.result;
      previewImage.classList.add("miniature-image");

      const ajoutContent = document.querySelector(".ajout-content");
      ajoutContent.innerHTML = "";
      ajoutContent.appendChild(previewImage);
    };
    reader.readAsDataURL(file);
  }
  validateForm();
}

function validateForm() {
  const titleInput = document.querySelector("#title");
  console.log(titleInput.value.length);
  if (titleInput.value.length > 0 && file !== null) {
    console.log("ok");
    validationButton.removeAttribute("disabled");
  } else {
    console.log("no");
    validationButton.setAttribute("disabled", "true");
  }
}

// Écouteur d'événement pour le clic sur le bouton "Valider"

validationButton.addEventListener("click", async (event) => {
  if (event.target.classList.contains("validation")) {
    const titleInput = document.querySelector("#title");
    const categorySelect = document.querySelector("#category");

    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", file);
    formData.append("category", parseInt(categorySelect.value));

    try {
      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Berear ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      console.log("Nouvelle photo ajoutée avec succès !");
      allProjects.push(data);
      displayGalerie();
      displayProjets(allProjects);
      document.querySelector("#modal-container-2").classList.remove("active");
    } catch (error) {
      console.error("Erreur lors de la requête d'ajout de photo :", error);
    }
  }
});
