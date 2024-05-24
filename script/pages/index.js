// Fonction asynchrone qui récupère les recettes depuis un fichier JS.
async function getRecipes() {
  recipes.forEach((recipe) => {
    console.log(recipe.name);
  });
  return recipes;
}

//Affiche les données des recettes dans la section dédiée sur la page HTML.
async function displayData(recipes) {
  // Sélectionne la section HTML où afficher les recettes
  const recipesSection = document.querySelector(".recipes-section");

  recipes.forEach((recipe) => {
    // Crée le modèle de recette et récupère l'élément DOM de sa carte recette
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecepieCardDOM();
    // Ajoute la carte recette à la section des recettes
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Appeler la fonction pour afficher les données des recettes
    displayData(recipes);
  });
}

init();
