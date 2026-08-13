export type IngredientCategory =
  'vegetable' | 'meat' | 'seafood' | 'dairy' | 'staple' | 'seasoning';

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategory;
  emoji: string;
};

export type UserIngredient = {
  id: string;
  ingredientId?: string;
  name: string;
  quantity?: number;
  unit?: string;
};

export const ingredientCategoryLabels: Record<IngredientCategory, string> = {
  vegetable: '野菜',
  meat: '肉',
  seafood: '魚介',
  dairy: '卵・乳製品',
  staple: '主食・豆',
  seasoning: '調味料',
};
