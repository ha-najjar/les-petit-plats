// Fonction pour filtrer les recettes basées sur la recherche de l'utilisateur en utilisant des boucles native
function filterRecipes(recipes, selectedItemsValues) {
  return recipes.filter((recipe) => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const recipeIngredients = recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase()
    );
    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map((ustensil) =>
      ustensil.toLowerCase()
    );

    return selectedItemsValues.every((selectedItem) => {
      const lowerSelectedItem = selectedItem.toLowerCase().trim();

      if (lowerSelectedItem === "") {
        return true;
      }

      const ingredientMatch = recipeIngredients.some((ingredient) =>
        ingredient.includes(lowerSelectedItem)
      );
      const applianceMatch = recipeAppliance.includes(lowerSelectedItem);
      const ustensilMatch = recipeUstensils.some((ustensil) =>
        ustensil.includes(lowerSelectedItem)
      );
      const nameMatch = recipeName.includes(lowerSelectedItem);
      const descriptionMatch = recipeDescription.includes(lowerSelectedItem);

      return (
        ingredientMatch ||
        applianceMatch ||
        ustensilMatch ||
        nameMatch ||
        descriptionMatch
      );
    });
  });
}
