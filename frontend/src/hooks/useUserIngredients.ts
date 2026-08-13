import { useEffect, useState } from 'react';
import {
  loadUserIngredients,
  saveUserIngredients,
} from '../storage/ingredientStorage';
import type { UserIngredient } from '../types/ingredient';

export function useUserIngredients() {
  const [ingredients, setIngredients] = useState<UserIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageMessage, setStorageMessage] = useState<string>();

  useEffect(() => {
    const result = loadUserIngredients();
    setIngredients(result.ingredients);
    setStorageMessage(result.warning);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        saveUserIngredients(ingredients);
      } catch {
        setStorageMessage(
          '端末へ保存できませんでした。空き容量やブラウザ設定をご確認ください。',
        );
      }
    }
  }, [ingredients, isLoading]);

  const addIngredient = (ingredient: Omit<UserIngredient, 'id'>) => {
    setIngredients((current) => {
      const duplicate = current.some(
        (item) =>
          (ingredient.ingredientId &&
            item.ingredientId === ingredient.ingredientId) ||
          item.name.toLocaleLowerCase('ja') ===
            ingredient.name.toLocaleLowerCase('ja'),
      );

      if (duplicate) return current;

      return [...current, { ...ingredient, id: window.crypto.randomUUID() }];
    });
  };

  const removeIngredient = (id: string) => {
    setIngredients((current) => current.filter((item) => item.id !== id));
  };

  return {
    ingredients,
    isLoading,
    storageMessage,
    addIngredient,
    removeIngredient,
  };
}
