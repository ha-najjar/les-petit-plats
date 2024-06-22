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
  /*async function populateDropdown(dropdown, items) {
    dropdown.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("li");
      option.classList = "cursor-pointer px-4 py-2 option";
      option.value = item;
      option.textContent = item;

      dropdown.appendChild(option);

      option.addEventListener("click", (event) => {
        event.preventDefault;
        displaySelectedItem(dropdown.id, item);
        updateSearchResults();
        closeDropdown(dropdown);
      });
    });
  }*/

  // Fonction pour ajouter des options à un dropdown
  async function populateDropdown(dropdown, items) {
    dropdown.innerHTML = "";

    items.forEach((item) => {
      const option = document.createElement("li");
      option.classList = "cursor-pointer px-4 py-2 option";
      option.value = item;
      option.textContent = item;

      // Vérifiez si l'élément est déjà sélectionné
      const selectedItemsValues = Array.from(
        document.querySelectorAll(".selected-item-value")
      ).map((element) => element.textContent);
      if (selectedItemsValues.includes(item)) {
        option.classList.add("selected-item-options");

        // Ajouter un Xmark pour l'élément sélectionné
        const xmark = document.createElement("span");
        xmark.classList = "xmark";
        xmark.innerHTML = "&times;"; // HTML entity for '×'
        option.appendChild(xmark);

        // Ajouter un gestionnaire d'événement pour le clic sur le Xmark
        xmark.addEventListener("click", (event) => {
          event.stopPropagation();
          option.classList.remove("selected-option-background");
          xmark.remove();

          const badges = document.querySelectorAll(".selected-option");
          badges.forEach((badge) => {
            if (badge.textContent.trim() === item) {
              badge.remove();
            }
          });

          updateSearchResults();
        });
      }
      dropdown.appendChild(option);

      option.addEventListener("click", (event) => {
        event.preventDefault();
        displaySelectedItem(dropdown.id, item);
        updateSearchResults();
        closeDropdown(dropdown);

        // Ajouter la classe de fond à l'élément sélectionné
        option.classList.add("selected-item-options");
      });
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
      const existingSelectedItems = document.querySelectorAll(
        ".selected-item-value"
      );
      const selectedItemsValues = Array.from(existingSelectedItems).map(
        (element) => element.textContent
      );

      // Vérifier si l'élément est déjà sélectionné
      if (selectedItemsValues.includes(item)) {
        return;
      }
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
        updateSearchResults();
      });

      badge.appendChild(badgeText);
      badge.appendChild(icon);
      selectedElement.appendChild(badge);

      const searchInput = document.querySelector("#search-input");
      if (searchInput.value.length >= 3 || searchInput.value === "") {
        selectedItemsValues.push(searchInput.value);
      }

      filterRecipes(recipes, selectedItemsValues);
      console.log(selectedItemsValues);
    }
  }
  const ulApp = document.querySelector("#appliances-content .options");
  const ulUstensils = document.querySelector("#ustensils-content .options");
  const ulIng = document.querySelector("#ingredient-content .options");
  // Fonction pour attacher les événements des dropdowns
  function attachDropdownEvents() {
    dropdownOptionIngredient.addEventListener("click", () => {
      openDropdown(dropdownOptionIngredient);
      closeDropdown(ulApp);
      closeDropdown(ulUstensils);
    });
    dropdownOptionAppliances.addEventListener("click", () => {
      openDropdown(dropdownOptionAppliances);
      closeDropdown(ulIng);
      closeDropdown(ulUstensils);
    });
    dropdownOptionUstensils.addEventListener("click", () => {
      openDropdown(dropdownOptionUstensils);
      closeDropdown(ulApp);
      closeDropdown(ulIng);
    });

    optionIngredientSearch.addEventListener("keyup", searchIngredients);
    optionAppliancesSearch.addEventListener("keyup", searchAppliances);
    optionUstensilSearch.addEventListener("keyup", searchUstensils);

    removeIngredientSearch.addEventListener("click", () => {
      clearIngredientSearch();
      updateSearchResults();
    });
    removeAppliancesSearch.addEventListener("click", () => {
      clearAppliancesSearch();
      updateSearchResults();
    });
    removeUstensilSearch.addEventListener("click", () => {
      clearUstensilSearch();
      updateSearchResults();
    });
  }

  // Fonction pour fermer les dropdowns en cliquant à l'extérieur
  function handleClickOutside(event) {
    if (
      !ingredientContent.contains(event.target) &&
      !dropdownOptionIngredient.contains(event.target)
    ) {
      closeDropdown(ulIng);
    }
    if (
      !appliancesContent.contains(event.target) &&
      !dropdownOptionAppliances.contains(event.target)
    ) {
      closeDropdown(ulApp);
    }
    if (
      !ustensilContent.contains(event.target) &&
      !dropdownOptionUstensils.contains(event.target)
    ) {
      closeDropdown(ulUstensils);
    }
  }

  document.addEventListener("click", handleClickOutside);

  function closeDropdown(dropdown) {
    dropdown.parentNode.classList.remove("open");
    dropdown.parentNode.parentNode.classList.remove("dropdown-box-active");
  }
  function openDropdown(dropdownOption) {
    // Accéder à l'élément parent de `dropdownOption`
    const parent = dropdownOption.parentElement;

    // Trouver l'élément `.content` à l'intérieur du parent
    const dropdownContent = parent.querySelector(".content");
    dropdownContent.classList.add("open");
    parent.classList.add("dropdown-box-active");
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

  attachDropdownEvents();
}
