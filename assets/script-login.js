const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  loginToAPI(email, password)
    .then((token) => {
      // Effacer le message d'erreur
      errorMessage.textContent = "";
      errorMessage.style.color = ""; // Réinitialiser la couleur du texte

      // Stocker le token d'authentification dans le stockage local
      localStorage.setItem("authToken", token);

      // Rediriger vers la page principale après la connexion
      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error("Erreur de connexion : ", error);

      // Afficher le message d'erreur
      errorMessage.textContent = "Identifiants invalides. Veuillez réessayer.";
      errorMessage.style.color = "red"; // Définir la couleur du texte en rouge
    });
});

async function loginToAPI(email, password) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Identifiants invalides");
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error("Erreur de connexion : " + error.message);
  }
}
