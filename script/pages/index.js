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
  } else {
    const recipesSection = document.querySelector(".recipes-section");
    const recipesNotFound = document.querySelector(".recipes-not-found");
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

// fonction pour la création des dropdowns
async function createDropdowns(recipes) {
  const ingredientsDropdownOptions = document.querySelector(
    "#options-ingredients"
  );
  const appliancesDropdownOptions = document.querySelector(
    "#options-appliances"
  );
  const ustensilsDropdownOptions = document.querySelector("#options-ustensils");

  const dropdownOptionIngredient = document.querySelector(
    "#dropdown-option-ingredient"
  );
  const ingredientContent = document.querySelector("#ingredient-content");
  const optionIngredientSearch = document.querySelector(
    "#option-ingredient-search"
  );

  const dropdownOptionAppliances = document.querySelector(
    "#dropdown-option-appliances"
  );
  const appliancesContent = document.querySelector("#appliances-content");
  const optionAppliancesSearch = document.querySelector(
    "#option-appliances-search"
  );

  const dropdownOptionUstensils = document.querySelector(
    "#dropdown-option-ustensils"
  );
  const ustensilContent = document.querySelector("#ustensils-content");
  const optionUstensilSearch = document.querySelector(
    "#option-ustensils-search"
  );

  const removeIngredientSearch = document.querySelector(
    ".remove-ingredients-search"
  );
  const removeAppliancesSearch = document.querySelector(
    ".remove-appliances-search"
  );
  const removeUstensilSearch = document.querySelector(
    ".remove-ustensils-search"
  );

  const ingredients = new Set();
  const appliances = new Set();
  const utensils = new Set();

  // Récupère les ingrédients, appareils et ustensiles de chaque recette
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) => ingredients.add(ing.ingredient));
    appliances.add(recipe.appliance);
    recipe.ustensils.forEach((ust) => utensils.add(ust));
  });

  // Fonction pour ajouter des options à un dropdown
  async function populateDropdown(dropdown, items) {
    dropdown.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("li");
      option.classList = "cursor-pointer px-4 py-2";
      option.value = item;
      option.textContent = item;

      option.addEventListener("click", () => {
        displaySelectedItem(dropdown.id, item);
        updateSearchResults(); // Ajout de cette ligne
      });

      dropdown.appendChild(option);
    });
  }

  // Fonction pour afficher l'élément sélectionné
  function displaySelectedItem(dropdownId, item) {
    let selectedElement;
    if (dropdownId === "options-ingredients") {
      selectedElement = document.querySelector("#selected-ingredient");
    } else if (dropdownId === "options-appliances") {
      selectedElement = document.querySelector("#selected-appliance");
    } else if (dropdownId === "options-ustensils") {
      selectedElement = document.querySelector("#selected-utensil");
    }

    if (selectedElement) {
      const badge = document.createElement("div");
      badge.classList = "selected-option flex justify-between items-center";
      const badgeText = document.createElement("span");
      badgeText.textContent = `${item}`;
      badgeText.classList = "selected-item-value";
      const icon = document.createElement("i");
      icon.classList = "fa-solid fa-xmark";

      // Ajout du gestionnaire d'événements pour supprimer le badge lorsqu'on clique sur l'icône
      icon.addEventListener("click", () => {
        badge.remove();
        updateSearchResults(); // Ajout de cette ligne
      });

      badge.appendChild(badgeText);
      badge.appendChild(icon);
      selectedElement.appendChild(badge);

      const selectedItems = document.querySelectorAll(".selected-item-value");
      const selectedItemsValues = Array.from(selectedItems).map(
        (element) => element.textContent
      );

      const searchInput = document.querySelector("#search-input");
      if (searchInput.value.length >= 3 || searchInput.value === "") {
        selectedItemsValues.push(searchInput.value);
      }

      filterRecipes(recipes, selectedItemsValues);
      console.log(selectedItemsValues);
    }
  }

  // Fonction pour attacher les événements des dropdowns
  function attachDropdownEvents() {
    dropdownOptionIngredient.removeEventListener(
      "click",
      toggleDropdownIngredient
    );
    dropdownOptionAppliances.removeEventListener(
      "click",
      toggleDropdownAppliances
    );
    dropdownOptionUstensils.removeEventListener(
      "click",
      toggleDropdownUstensils
    );

    dropdownOptionIngredient.addEventListener(
      "click",
      toggleDropdownIngredient
    );
    dropdownOptionAppliances.addEventListener(
      "click",
      toggleDropdownAppliances
    );
    dropdownOptionUstensils.addEventListener("click", toggleDropdownUstensils);

    optionIngredientSearch.addEventListener("keyup", searchIngredients);
    optionAppliancesSearch.addEventListener("keyup", searchAppliances);
    optionUstensilSearch.addEventListener("keyup", searchUstensils);

    removeIngredientSearch.addEventListener("click", () => {
      clearIngredientSearch();
      updateSearchResults(); // Ajout de cette ligne
    });
    removeAppliancesSearch.addEventListener("click", () => {
      clearAppliancesSearch();
      updateSearchResults(); // Ajout de cette ligne
    });
    removeUstensilSearch.addEventListener("click", () => {
      clearUstensilSearch();
      updateSearchResults(); // Ajout de cette ligne
    });
  }

  function toggleDropdownIngredient() {
    ingredientContent.classList.toggle("open");
    const dropdownBox = dropdownOptionIngredient.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionIngredient.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  }

  function toggleDropdownAppliances() {
    appliancesContent.classList.toggle("open");
    const dropdownBox = dropdownOptionAppliances.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionAppliances.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  }

  function toggleDropdownUstensils() {
    ustensilContent.classList.toggle("open");
    const dropdownBox = dropdownOptionUstensils.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionUstensils.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  }

  function searchIngredients(event) {
    if (event.target.value.length > 0) {
      const filteredSet = new Set(
        Array.from(ingredients).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(ingredientsDropdownOptions, filteredSet);
    } else {
      populateDropdown(ingredientsDropdownOptions, ingredients);
    }
  }

  function searchAppliances(event) {
    if (event.target.value.length > 0) {
      const filteredSet = new Set(
        Array.from(appliances).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(appliancesDropdownOptions, filteredSet);
    } else {
      populateDropdown(appliancesDropdownOptions, appliances);
    }
  }

  function searchUstensils(event) {
    if (event.target.value.length > 0) {
      const filteredSet = new Set(
        Array.from(utensils).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(ustensilsDropdownOptions, filteredSet);
    } else {
      populateDropdown(ustensilsDropdownOptions, utensils);
    }
  }

  function clearIngredientSearch() {
    optionIngredientSearch.value = "";
    populateDropdown(ingredientsDropdownOptions, ingredients);
  }

  function clearAppliancesSearch() {
    optionAppliancesSearch.value = "";
    populateDropdown(appliancesDropdownOptions, appliances);
  }

  function clearUstensilSearch() {
    optionUstensilSearch.value = "";
    populateDropdown(ustensilsDropdownOptions, utensils);
  }

  await populateDropdown(ingredientsDropdownOptions, ingredients);
  await populateDropdown(appliancesDropdownOptions, appliances);
  await populateDropdown(ustensilsDropdownOptions, utensils);

  // Attacher les événements après avoir peuplé les dropdowns
  attachDropdownEvents();
}

init();
