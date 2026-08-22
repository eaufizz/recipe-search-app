import { HashRouter, Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { StatusPanel } from './components/StatusPanel';
import { useUserIngredients } from './hooks/useUserIngredients';
import { Page } from './styles/ui';
import { BottomNavigation } from './components/BottomNavigation';
import HomePage from './pages/Home.page';
import IngredientsPage from './pages/Ingredients.page';
import RecipeDetailPage from './pages/RecipeDetail.page';
import RecipeListPage from './pages/RecipeList.page';

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
          <Route path="/recipes" element={<RecipeListPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Routes>
      )}
      <BottomNavigation />
    </HashRouter>
  );
}

export default App;
