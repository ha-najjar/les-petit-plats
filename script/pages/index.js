// Fonction pour filtrer les recettes basées sur la recherche de l'utilisateur en utilisant des boucles natives
function filterRecipes(recipes, selectedItemsValues) {
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();

    // Convertir les ingrédients en minuscules
    const recipeIngredients = [];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
    }

    // Convertir l'appareil en minuscules
    const recipeAppliance = recipe.appliance.toLowerCase();

    // Convertir les ustensiles en minuscules
    const recipeUstensils = [];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      recipeUstensils.push(recipe.ustensils[j].toLowerCase());
    }

    let allItemsMatch = true;

    for (let k = 0; k < selectedItemsValues.length; k++) {
      const selectedItem = selectedItemsValues[k].toLowerCase();

      let ingredientMatch = false;
      let applianceMatch = false;
      let ustensilMatch = false;

      // Vérifier les ingrédients
      for (let j = 0; j < recipeIngredients.length; j++) {
        if (recipeIngredients[j].includes(selectedItem)) {
          ingredientMatch = true;
          break;
        }
      }

      // Vérifier l'appareil
      if (recipeAppliance.includes(selectedItem)) {
        applianceMatch = true;
      }

      // Vérifier les ustensiles
      for (let j = 0; j < recipeUstensils.length; j++) {
        if (recipeUstensils[j].includes(selectedItem)) {
          ustensilMatch = true;
          break;
        }
      }

      if (
        !recipeName.includes(selectedItem) &&
        !recipeDescription.includes(selectedItem) &&
        !ingredientMatch &&
        !applianceMatch &&
        !ustensilMatch
      ) {
        allItemsMatch = false;
        break;
      }
    }

    if (allItemsMatch) {
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

async function init() {
  document.addEventListener("DOMContentLoaded", () => {
    // Appeler la fonction pour afficher les données des recettes
    displayData(recipes);
    // Appeler la fonction pour créer et remplir les dropdowns
    createDropdowns(recipes);
    recipesNumber(recipes);

    // Ajouter un écouteur d'événement pour le bouton de recherche
    const searchButton = document.querySelector("#search-button");
    const searchInput = document.querySelector("#search-input");

    // Ajouter un écouteur d'événement pour le bouton de recherche

    searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      const query = searchInput.value;

      if (query.length >= 3) {
        const selectedItems = document.querySelectorAll(".selected-item-value");
        const selectedItemsValues = Array.from(selectedItems).map(
          (element) => element.textContent
        );
        selectedItemsValues.push(query);
        console.log(selectedItemsValues);
        const filteredRecipes = filterRecipes(recipes, selectedItemsValues);
        if (filteredRecipes.length > 0) {
          updateDisplay(filteredRecipes);
        } else {
          const recipesSection = document.querySelector(".recipes-section");
          const recipesNotFound = document.querySelector(".recipes-not-found");
          recipesSection.innerHTML = "";
          recipesNotFound.innerHTML = `
                   <p class="text-center font-medium"> « Aucune recette ne contient '${query}' vous pouvez chercher «
                   tarte aux pommes », « poisson », etc...</p>
        `;
          recipesNumber("");
        }
      } else {
        // Si moins de 3 caractères, réinitialiser l'affichage avec toutes les recettes
        updateDisplay(recipes);
      }
    });
  });
}

init();
