// Fonction pour mettre à jour l'affichage des recettes et le nombre de recettes
function updateDisplay(filteredRecipes) {
  // Vider la section des recettes
  const recipesSection = document.querySelector(".recipes-section");
  recipesSection.innerHTML = "";

  // Afficher les recettes filtrées
  displayData(filteredRecipes);

  // Mettre à jour le nombre de recettes
  recipesNumber(filteredRecipes);

  // Mettre à jour les dropdowns avec les recettes filtrées
  createDropdowns(filteredRecipes);
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

// Fonction pour mettre à jour les résultats de recherche
function updateSearchResults() {
  const recipesNotFound = document.querySelector(".recipes-not-found");
  const selectedItems = document.querySelectorAll(".selected-item-value");
  const selectedItemsValues = Array.from(selectedItems).map(
    (element) => element.textContent
  );

  const searchInput = document.querySelector("#search-input");
  if (searchInput.value.length >= 3 || searchInput.value === "") {
    selectedItemsValues.push(searchInput.value);
  }

  const filteredRecipes = filterRecipes(recipes, selectedItemsValues);
  if (filteredRecipes.length > 0) {
    updateDisplay(filteredRecipes);
    recipesNotFound.innerHTML = "";
  } else {
    const recipesSection = document.querySelector(".recipes-section");
    recipesSection.innerHTML = "";
    recipesNotFound.innerHTML = `
                 <p class="text-center font-medium"> « Aucune recette ne contient '${searchInput.value}' vous pouvez chercher «
                 tarte aux pommes », « poisson », etc...</p>
    `;
    recipesNumber("");
  }
}

async function init() {
  document.addEventListener("DOMContentLoaded", async () => {
    // Appeler la fonction pour afficher les données des recettes
    displayData(recipes);
    // Appeler la fonction pour créer et remplir les dropdowns
    await createDropdowns(recipes);
    recipesNumber(recipes);

    // Ajouter un écouteur d'événement pour le bouton de recherche
    //const searchButton = document.querySelector("#search-button");
    const searchInput = document.querySelector("#search-input");

    // Ajouter un écouteur d'événement pour le bouton de recherche
    searchInput.addEventListener("input", () => {
      //event.preventDefault();
      updateSearchResults();
    });
  });
}

init();
