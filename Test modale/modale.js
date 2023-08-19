// Affichage modale

const modalContainers = document.querySelectorAll(".modal-container-1");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainers.forEach((container) => {
    container.classList.toggle("active");
  });
}

// Filtre dynamique

const categorySelect = document.querySelector("#category");
const categories = ["", "Nature", "City", "Architecture", "People", "Other"];

categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

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
  const modal1 = document.getElementById(
    "modal-container-1, modal-container-2"
  );
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
