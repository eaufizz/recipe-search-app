export type RecipeIngredient = {
  ingredientId: string;
  name: string;
  amount: string;
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  cookingTimeMinutes: number;
  ingredients: RecipeIngredient[];
  steps: string[];
};

export type RecipeMatch = {
  recipe: Recipe;
  matchedIngredients: RecipeIngredient[];
  missingIngredients: RecipeIngredient[];
  matchedCount: number;
  matchRate: number;
  canCook: boolean;
};
