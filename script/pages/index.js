/*async function getRecipes() {
  recipes.forEach((recipe) => {
    console.log(recipe.name);
  });
  return recipes;
}

// Affiche les données des recettes dans la section dédiée sur la page HTML.
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
function recipesNumber(recipes) {
  const recipesNumberElement = document.querySelector(".recipes-number");
  let nbrRecipes = 0;
  recipes.forEach(() => {
    nbrRecipes += 1;
  });
  console.log(nbrRecipes);
  recipesNumberElement.textContent = `${nbrRecipes} recettes`;
}

async function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Appeler la fonction pour afficher les données des recettes
    displayData(recipes);
    // Appeler la fonction pour créer et remplir les dropdowns
    createDropdowns(recipes);
    recipesNumber(recipes);
  });
}

init();*/

// Fonction pour filtrer les recettes basées sur la recherche de l'utilisateur en utilisant des boucles natives
function filterRecipes(recipes, query) {
  const filteredRecipes = [];
  const lowerCaseQuery = query.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    let ingredientMatch = false;

    // Utiliser une boucle for pour convertir les ingrédients en minuscules
    const recipeIngredients = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
    }

    // Utiliser une boucle for pour vérifier si l'un des ingrédients correspond à la requête
    for (let j = 0; j < recipeIngredients.length; j++) {
      if (recipeIngredients[j].includes(lowerCaseQuery)) {
        ingredientMatch = true;
        break;
      }
    }

    if (
      recipeName.includes(lowerCaseQuery) ||
      ingredientMatch ||
      recipeDescription.includes(lowerCaseQuery)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}

// Fonction pour mettre à jour l'affichage des recettes et le nombre de recettes
function updateDisplay(filteredRecipes) {
  // Vider la section des recettes
  const recipesSection = document.querySelector(".recipes-section");
  recipesSection.innerHTML = "";

  // Afficher les recettes filtrées
  displayData(filteredRecipes);

  // Mettre à jour le nombre de recettes
  recipesNumber(filteredRecipes);
}

// Affiche les données des recettes dans la section dédiée sur la page HTML
async function displayData(recipes) {
  // Sélectionne la section HTML où afficher les recettes
  const recipesSection = document.querySelector(".recipes-section");

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    // Crée le modèle de recette et récupère l'élément DOM de sa carte recette
    const recipeModel = recipeTemplate(recipe);
    const recipeCardDOM = recipeModel.getRecepieCardDOM();
    // Ajoute la carte recette à la section des recettes
    recipesSection.appendChild(recipeCardDOM);
  }
}

function recipesNumber(recipes) {
  const recipesNumberElement = document.querySelector(".recipes-number");
  let nbrRecipes = 0;
  for (let i = 0; i < recipes.length; i++) {
    nbrRecipes += 1;
  }
  recipesNumberElement.textContent = `${nbrRecipes} recettes`;
}

async function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Appeler la fonction pour afficher les données des recettes
    displayData(recipes);
    // Appeler la fonction pour créer et remplir les dropdowns
    createDropdowns(recipes);
    recipesNumber(recipes);

    // Ajouter un écouteur d'événement pour la barre de recherche
    const searchBar = document.querySelector(".search-bar input");
    searchBar.addEventListener("keyup", (event) => {
      const query = event.target.value;
      if (query.length >= 3) {
        const filteredRecipes = filterRecipes(recipes, query);
        updateDisplay(filteredRecipes);
      } else {
        // Si moins de 3 caractères, réinitialiser l'affichage avec toutes les recettes
        updateDisplay(recipes);
      }
    });
  });
}

init();
