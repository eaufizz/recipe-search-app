import { useParams } from 'react-router';

function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1>レシピ詳細</h1>
      <p>レシピID: {id}</p>
    </main>
  );
}

export default RecipeDetailPage;
