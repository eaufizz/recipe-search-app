import { HashRouter, Route, Routes } from 'react-router';
import { BottomNavigation, Header } from './components/Header';
import { StatusPanel } from './components/StatusPanel';
import { useUserIngredients } from './hooks/useUserIngredients';
import HomePage from './pages/Home.page';
import IngredientsPage from './pages/Ingredients.page';
import RecipeDetailPage from './pages/RecipeDetail.page';
import RecipeListPage from './pages/RecipeList.page';
import { Page } from './styles/ui';

function App() {
  const {
    ingredients,
    isLoading,
    storageMessage,
    addIngredient,
    removeIngredient,
  } = useUserIngredients();

  return (
    <HashRouter>
      <Header ingredientCount={ingredients.length} />
      {isLoading ? (
        <Page>
          <StatusPanel
            icon="🥣"
            title="冷蔵庫を確認しています"
            description="保存した食材を読み込んでいます。"
          />
        </Page>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage ingredients={ingredients} />} />
          <Route
            path="/ingredients"
            element={
              <IngredientsPage
                userIngredients={ingredients}
                storageMessage={storageMessage}
                onAdd={addIngredient}
                onRemove={removeIngredient}
              />
            }
          />
          <Route
            path="/recipes"
            element={<RecipeListPage userIngredients={ingredients} />}
          />
          <Route
            path="/recipes/:recipeId"
            element={<RecipeDetailPage userIngredients={ingredients} />}
          />
          <Route
            path="*"
            element={
              <Page>
                <StatusPanel
                  icon="?"
                  title="ページが見つかりません"
                  description="下のナビゲーションから移動してください。"
                  tone="warning"
                />
              </Page>
            }
          />
        </Routes>
      )}
      <BottomNavigation />
    </HashRouter>
  );
}

export default App;
