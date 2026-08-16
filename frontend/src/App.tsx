import { HashRouter, Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import HomePage from './pages/Home.page';
import IngredientsPage from './pages/Ingredients.page';
import RecipeDetailPage from './pages/RecipeDetail.page';
import RecipeListPage from './pages/RecipeList.page';

function App() {
  return (
    <HashRouter>
      <Header ingredientCount={0} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients" element={<IngredientsPage />} />
        <Route path="/recipes" element={<RecipeListPage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      </Routes>
      <BottomNavigation />
    </HashRouter>
  );
}

export default App;
