let urlWorks = "http://localhost:5678/api/works";
let urlCategories = "http://localhost:5678/api/categories";
let galleryContainer = document.getElementsByClassName("gallery")[0];

fetch(urlWorks)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((projet) => {
      let imageURL = projet.imageUrl;
      let nom = projet.title;

      // Création des éléments de la galerie
      let figure = document.createElement("figure");
      let image = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      // Attribution des valeurs récupérées depuis l'API aux éléments de la galerie
      image.src = imageURL;
      image.alt = nom;
      figcaption.textContent = nom;

      // Ajout des éléments à la galerie
      figure.appendChild(image);
      figure.appendChild(figcaption);
      galleryContainer.appendChild(figure);
    });
  })
  .catch((error) => {
    console.error(error);
  });

fetch(urlCategories)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((categorie) => {
      const categoryLinks = document.getElementsByClassName(
        `btn-${categorie.name.toLowerCase().replace(/\s+/g, "-")}`
      );
      Array.from(categoryLinks).forEach((link) => {
        link.classList.add("active");
      });
    });
  });

function filterElements(nomCategorie) {
  const elementGallery = galleryContainer.getElementsByClassName("figure");
  Array.from(elementGallery).forEach((Element) => {
    const figcaption = element.querySelector("figcaption");
    if (estCategorieValide(figcaption.textContent, nomCategorie)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

function estCategorieValide(name, nomCategorie) {
  const categorieCorrespondante = categoriesData.find(
    (categorie) => categorie.name.toLowerCase() === nomCategorie.toLowerCase()
  );
  if (categorieCorrespondante) {
    return categorieCorrespondante.name.toLowerCase() === name.toLowerCase();
  }
  return false;
}
