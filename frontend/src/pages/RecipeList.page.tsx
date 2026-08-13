import { useMemo, useState } from 'react';
import styled from 'styled-components';
import RecipeCard from '../components/RecipeCard';
import { StatusPanel } from '../components/StatusPanel';
import { recipes } from '../data/recipes';
import { matchRecipes } from '../services/recipeMatching';
import { theme } from '../styles/theme';
import {
  Eyebrow,
  Lead,
  Page,
  PageHeader,
  PageTitle,
  PrimaryLink,
  Section,
  SectionHeading,
} from '../styles/ui';
import type { UserIngredient } from '../types/ingredient';

type SortOption = 'match' | 'time';

const SortSelect = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.textMuted};
  font-size: 0.82rem;
  font-weight: 750;

  select {
    min-height: 2.75rem;
    padding: 0 2rem 0 0.75rem;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.pill};
    background: ${theme.colors.surface};
    color: ${theme.colors.text};
    font-size: 1rem;
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const EmptyAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

function RecipeListPage({
  userIngredients,
}: {
  userIngredients: UserIngredient[];
}) {
  const [sortBy, setSortBy] = useState<SortOption>('match');

  const matches = useMemo(() => {
    const matchedRecipes = matchRecipes(recipes, userIngredients).filter(
      (match) => match.matchedCount > 0,
    );

    return matchedRecipes.sort((a, b) => {
      if (sortBy === 'time') {
        return a.recipe.cookingTimeMinutes - b.recipe.cookingTimeMinutes;
      }
      if (a.canCook !== b.canCook) return a.canCook ? -1 : 1;
      if (b.matchRate !== a.matchRate) return b.matchRate - a.matchRate;
      return a.recipe.cookingTimeMinutes - b.recipe.cookingTimeMinutes;
    });
  }, [sortBy, userIngredients]);

  const readyCount = matches.filter((match) => match.canCook).length;

  return (
    <Page>
      <PageHeader>
        <Eyebrow>Recipe matches</Eyebrow>
        <PageTitle>作れそうな料理</PageTitle>
        <Lead>
          {userIngredients.length > 0
            ? `${userIngredients.length}件の食材から候補を探しました。完全一致は${readyCount}件です。`
            : '食材を登録すると、ここに作れそうな料理が表示されます。'}
        </Lead>
      </PageHeader>

      {userIngredients.length === 0 ? (
        <>
          <StatusPanel
            icon="🥕"
            title="まず食材を登録しましょう"
            description="冷蔵庫にある食材を1つ以上追加すると、レシピを照合できます。"
          />
          <EmptyAction>
            <PrimaryLink to="/ingredients">食材を登録する</PrimaryLink>
          </EmptyAction>
        </>
      ) : matches.length === 0 ? (
        <>
          <StatusPanel
            icon="🔎"
            title="一致するレシピがありません"
            description="別の食材を追加するか、登録名を確認してもう一度お試しください。"
          />
          <EmptyAction>
            <PrimaryLink to="/ingredients">食材を見直す</PrimaryLink>
          </EmptyAction>
        </>
      ) : (
        <Section>
          <SectionHeading>
            <h2>{matches.length}件の候補</h2>
            <SortSelect>
              並び順
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
              >
                <option value="match">一致度が高い順</option>
                <option value="time">調理時間が短い順</option>
              </select>
            </SortSelect>
          </SectionHeading>
          <RecipeGrid>
            {matches.map((match) => (
              <RecipeCard key={match.recipe.id} match={match} />
            ))}
          </RecipeGrid>
        </Section>
      )}
    </Page>
  );
}

export default RecipeListPage;
