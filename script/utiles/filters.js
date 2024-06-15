// Fonction pour filtrer les recettes basées sur la recherche de l'utilisateur en utilisant des boucles native
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

      // Ignorer les éléments vides
      if (selectedItem.trim() === "") {
        continue;
      }

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
