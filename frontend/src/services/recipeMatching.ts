import type { UserIngredient } from '../types/ingredient';
import type { Recipe, RecipeMatch } from '../types/recipe';

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase('ja');
}

export function matchRecipe(
  recipe: Recipe,
  userIngredients: UserIngredient[],
): RecipeMatch {
  const ownedIngredientIds = new Set(
    userIngredients
      .map((ingredient) => ingredient.ingredientId)
      .filter((id): id is string => Boolean(id)),
  );
  const ownedNames = new Set(
    userIngredients.map((ingredient) => normalize(ingredient.name)),
  );

  const matchedIngredients = recipe.ingredients.filter(
    (ingredient) =>
      ownedIngredientIds.has(ingredient.ingredientId) ||
      ownedNames.has(normalize(ingredient.name)),
  );
  const missingIngredients = recipe.ingredients.filter(
    (ingredient) => !matchedIngredients.includes(ingredient),
  );
  const matchRate =
    recipe.ingredients.length === 0
      ? 0
      : Math.round(
          (matchedIngredients.length / recipe.ingredients.length) * 100,
        );

  return {
    recipe,
    matchedIngredients,
    missingIngredients,
    matchedCount: matchedIngredients.length,
    matchRate,
    canCook: missingIngredients.length === 0,
  };
}

export function matchRecipes(
  recipes: Recipe[],
  userIngredients: UserIngredient[],
): RecipeMatch[] {
  return recipes.map((recipe) => matchRecipe(recipe, userIngredients));
}
