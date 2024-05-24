// Crée une carte recette DOM  à partir des données fournies.
function recipeTemplate(recipe) {
  return {
    getRecepieCardDOM() {
      // Crée un élément DOM pour la carte de recette
      const recipeCard = document.createElement("article");
      recipeCard.classList.add("recipe-card");
      const image = `assets/image/${recipe.image}`;

      // Ajoute les détails de la recette à la carte
      recipeCard.innerHTML = `
                <img src="${image}" alt="${recipe.name}" />
                <h2>${recipe.name}</h2>
                <div class="Temps"> ${recipe.time} min</div>
                <div class="recipe-card-info">
                <h3>recette</h3>
                <p>${recipe.description}</p>
                <h3>ingrédients</h3>
                <ul class="grid grid-cols-2 gap-4">
                ${recipe.ingredients
                  .map(
                    (ing) =>
                      `<li>
                         <div>${ing.ingredient}</div>
                         <div class="quantity">${
                           ing.quantity ? ing.quantity : ""
                         } ${ing.unit ? ing.unit : ""}</div>
                       </li>`
                  )
                  .join("")}
              </ul>
                </div>
            `;

      return recipeCard;
    },
  };
}
