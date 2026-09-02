import type { UserIngredient } from '../types/ingredient';

const STORAGE_KEY = 'recipe-search:user-ingredients:v1';

export type IngredientStorageResult = {
  ingredients: UserIngredient[];
  warning?: string;
};

function isUserIngredient(value: unknown): value is UserIngredient {
  if (typeof value !== 'object' || value === null) return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    candidate.name.trim().length > 0 &&
    (candidate.ingredientId === undefined ||
      typeof candidate.ingredientId === 'string') &&
    (candidate.unit === undefined || typeof candidate.unit === 'string')
  );
}

export function loadUserIngredients(): IngredientStorageResult {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) return { ingredients: [] };

    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return {
        ingredients: [],
        warning: '保存データを読み込めなかったため、空の状態で開始しました。',
      };
    }

    const validIngredients = parsed.filter(isUserIngredient);
    return {
      ingredients: validIngredients,
      warning:
        validIngredients.length !== parsed.length
          ? '一部の古い保存データを除外しました。'
          : undefined,
    };
  } catch {
    return {
      ingredients: [],
      warning: '保存データが壊れていたため、空の状態で開始しました。',
    };
  }
}

export function saveUserIngredients(ingredients: UserIngredient[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
}
