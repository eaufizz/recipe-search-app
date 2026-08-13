import { Link, useParams } from 'react-router';
import styled from 'styled-components';
import { StatusPanel } from '../components/StatusPanel';
import { recipes } from '../data/recipes';
import { matchRecipe } from '../services/recipeMatching';
import { theme } from '../styles/theme';
import {
  Card,
  Eyebrow,
  Lead,
  Page,
  PageTitle,
  Section,
  SectionHeading,
} from '../styles/ui';
import type { UserIngredient } from '../types/ingredient';

const BackLink = styled(Link)`
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  margin-bottom: 1rem;
  color: ${theme.colors.primaryStrong};
  font-weight: 800;
  text-decoration: none;
`;

const RecipeHero = styled(Card)`
  overflow: hidden;
`;

const HeroVisual = styled.div`
  display: grid;
  min-height: 10.5rem;
  place-items: center;
  background: linear-gradient(135deg, ${theme.colors.primarySoft}, #f3d8b4);
  font-size: 4.5rem;
`;

const HeroContent = styled.div`
  padding: 1.25rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.45rem;
  margin-top: 1rem;

  div {
    min-width: 0;
    padding: 0.7rem 0.35rem;
    border-radius: ${theme.radius.small};
    background: ${theme.colors.surfaceMuted};
    text-align: center;
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 1.05rem;
  }

  span {
    margin-top: 0.15rem;
    color: ${theme.colors.textMuted};
    font-size: 0.7rem;
  }
`;

const IngredientList = styled.ul`
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const IngredientRow = styled.li<{ $owned: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid
    ${({ $owned }) => ($owned ? theme.colors.primarySoft : theme.colors.border)};
  border-radius: ${theme.radius.small};
  background: ${({ $owned }) =>
    $owned ? theme.colors.primarySoft : theme.colors.surface};

  div {
    min-width: 0;
  }

  strong,
  small {
    display: block;
  }

  small {
    margin-top: 0.15rem;
    color: ${theme.colors.textMuted};
  }

  span {
    flex: 0 0 auto;
    color: ${({ $owned }) =>
      $owned ? theme.colors.success : theme.colors.warning};
    font-size: 0.78rem;
    font-weight: 850;
  }
`;

const Steps = styled.ol`
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  counter-reset: step;
  list-style: none;

  li {
    position: relative;
    min-height: 3rem;
    padding-left: 3.5rem;
    color: ${theme.colors.textMuted};
    line-height: 1.65;
    counter-increment: step;
  }

  li::before {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    width: 2.6rem;
    height: 2.6rem;
    place-items: center;
    border-radius: 50%;
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.accent};
    content: counter(step);
    font-weight: 900;
  }
`;

function RecipeDetailPage({
  userIngredients,
}: {
  userIngredients: UserIngredient[];
}) {
  const { recipeId } = useParams();
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return (
      <Page>
        <BackLink to="/recipes">← レシピ一覧へ</BackLink>
        <StatusPanel
          icon="?"
          title="レシピが見つかりません"
          description="URLをご確認のうえ、一覧からもう一度選んでください。"
          tone="warning"
        />
      </Page>
    );
  }

  const match = matchRecipe(recipe, userIngredients);
  const matchedIds = new Set(
    match.matchedIngredients.map((ingredient) => ingredient.ingredientId),
  );

  return (
    <Page>
      <BackLink to="/recipes">← レシピ一覧へ戻る</BackLink>
      <RecipeHero>
        <HeroVisual aria-hidden="true">{recipe.emoji}</HeroVisual>
        <HeroContent>
          <Eyebrow>{match.canCook ? 'Ready to cook' : 'Almost ready'}</Eyebrow>
          <PageTitle>{recipe.name}</PageTitle>
          <Lead>{recipe.description}</Lead>
          <Stats>
            <div>
              <strong>{recipe.cookingTimeMinutes}分</strong>
              <span>調理時間</span>
            </div>
            <div>
              <strong>{match.matchRate}%</strong>
              <span>食材一致</span>
            </div>
            <div>
              <strong>{match.missingIngredients.length}品</strong>
              <span>不足食材</span>
            </div>
          </Stats>
        </HeroContent>
      </RecipeHero>

      <Section>
        <SectionHeading>
          <h2>必要な食材</h2>
          <span>数量は目安です</span>
        </SectionHeading>
        <IngredientList>
          {recipe.ingredients.map((ingredient) => {
            const owned = matchedIds.has(ingredient.ingredientId);
            return (
              <IngredientRow key={ingredient.ingredientId} $owned={owned}>
                <div>
                  <strong>{ingredient.name}</strong>
                  <small>{ingredient.amount}</small>
                </div>
                <span>{owned ? '✓ 持っています' : '＋ 不足'}</span>
              </IngredientRow>
            );
          })}
        </IngredientList>
      </Section>

      <Section>
        <SectionHeading>
          <h2>作り方</h2>
        </SectionHeading>
        <Steps>
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </Steps>
      </Section>
    </Page>
  );
}

export default RecipeDetailPage;
