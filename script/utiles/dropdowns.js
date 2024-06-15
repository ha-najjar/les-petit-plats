/*// fonction pour la création des dropdowns
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

      option.addEventListener("click", (event) => {
        event.preventDefault();
        displaySelectedItem(dropdown.id, item);
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
      });

      badge.appendChild(badgeText);
      badge.appendChild(icon);
      selectedElement.appendChild(badge);

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

    removeIngredientSearch.addEventListener("click", clearIngredientSearch);
    removeAppliancesSearch.addEventListener("click", clearAppliancesSearch);
    removeUstensilSearch.addEventListener("click", clearUstensilSearch);
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
}*/
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

      option.addEventListener("click", (event) => {
        event.stopPropagation();
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
      icon.addEventListener("click", (event) => {
        event.stopPropagation();
        badge.remove();
        updateSearchResults();
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
