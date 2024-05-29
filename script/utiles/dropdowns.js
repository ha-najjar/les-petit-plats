// Crée les dropdowns pour ingrédients, appareils et ustensiles
function createDropdowns(recipes) {
  const ingredientsDropdown = document.createElement("select");
  const appliancesDropdown = document.createElement("select");
  const utensilsDropdown = document.createElement("select");

  ingredientsDropdown.id = "ingredients";
  appliancesDropdown.id = "appliances";
  utensilsDropdown.id = "utensils";

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
  function populateDropdown(dropdown, items, defaultValue) {
    dropdown.innerHTML = `<option value="" selected disabled>${defaultValue}</option>`;
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      dropdown.appendChild(option);
    });
  }

  populateDropdown(ingredientsDropdown, ingredients, "Ingrédients");
  populateDropdown(appliancesDropdown, appliances, "Appareils");
  populateDropdown(utensilsDropdown, utensils, "Ustensiles");

  // Ajoute les dropdowns des appareils et ustensiles au DOM
  const filtersContainer = document.querySelector(".filters-container");
  filtersContainer.appendChild(ingredientsDropdown);
  filtersContainer.appendChild(appliancesDropdown);
  filtersContainer.appendChild(utensilsDropdown);
}
