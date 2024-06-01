// Crée les dropdowns pour ingrédients, appareils et ustensiles
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
      dropdown.appendChild(option);
    });
  }

  await populateDropdown(ingredientsDropdownOptions, ingredients);
  await populateDropdown(appliancesDropdownOptions, appliances);
  await populateDropdown(ustensilsDropdownOptions, utensils);

  dropdownOptionIngredient.addEventListener("click", () => {
    ingredientContent.classList.toggle("open");
    const dropdownBox = dropdownOptionIngredient.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionIngredient.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  });

  optionIngredientSearch.addEventListener("keyup", (event) => {
    if (event.target.value.length > 0) {
      // Convert Set to Array, filter, and convert back to Set
      const filteredSet = new Set(
        Array.from(ingredients).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(ingredientsDropdownOptions, filteredSet);
    } else {
      populateDropdown(ingredientsDropdownOptions, ingredients);
    }
  });

  dropdownOptionAppliances.addEventListener("click", () => {
    appliancesContent.classList.toggle("open");
    const dropdownBox = dropdownOptionAppliances.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionAppliances.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  });

  optionAppliancesSearch.addEventListener("keyup", (event) => {
    if (event.target.value.length > 0) {
      // Convert Set to Array, filter, and convert back to Set
      const filteredSet = new Set(
        Array.from(appliances).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(appliancesDropdownOptions, filteredSet);
    } else {
      populateDropdown(appliancesDropdownOptions, appliances);
    }
  });

  dropdownOptionUstensils.addEventListener("click", () => {
    ustensilContent.classList.toggle("open");
    const dropdownBox = dropdownOptionUstensils.parentNode;
    dropdownBox.classList.toggle("dropdown-box-active");
    const iconElement = dropdownOptionUstensils.children[1];
    if (iconElement.classList.contains("fa-chevron-up")) {
      iconElement.classList.replace("fa-chevron-up", "fa-chevron-down");
    } else {
      iconElement.classList.replace("fa-chevron-down", "fa-chevron-up");
    }
  });

  optionUstensilSearch.addEventListener("keyup", (event) => {
    if (event.target.value.length > 0) {
      // Convert Set to Array, filter, and convert back to Set
      const filteredSet = new Set(
        Array.from(utensils).filter((item) =>
          item.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      populateDropdown(ustensilsDropdownOptions, filteredSet);
    } else {
      populateDropdown(ustensilsDropdownOptions, utensils);
    }
  });
}
