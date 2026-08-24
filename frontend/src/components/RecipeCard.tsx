import { Link } from 'react-router';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import type { RecipeMatch } from '../types/recipe';

const RecipeLink = styled(Link)`
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.surface};
  color: inherit;
  text-decoration: none;
  box-shadow: ${theme.shadow.card};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadow.elevated};
  }
`;

const Visual = styled.div`
  display: grid;
  min-height: 9rem;
  place-items: center;
  background: linear-gradient(145deg, ${theme.colors.primarySoft}, #f2dfbe);
  font-size: 2.6rem;
`;

const Content = styled.div`
  min-width: 0;
  padding: 0.9rem;

  h2 {
    margin: 0.4rem 0 0.45rem;
    overflow-wrap: anywhere;
    font-size: 1.02rem;
    line-height: 1.35;
  }
`;

const Status = styled.span<{ $complete: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ $complete }) =>
    $complete ? theme.colors.success : theme.colors.warning};
  font-size: 0.74rem;
  font-weight: 850;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  color: ${theme.colors.textMuted};
  font-size: 0.78rem;
`;

const Progress = styled.div`
  height: 0.42rem;
  margin-top: 0.75rem;
  overflow: hidden;
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.surfaceMuted};

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: ${theme.colors.primary};
  }
`;

function RecipeCard({ match }: { match: RecipeMatch }) {
  const { recipe } = match;

  return (
    <RecipeLink to={`/recipes/${recipe.id}`}>
      <Visual aria-hidden="true">{recipe.emoji}</Visual>
      <Content>
        <Status $complete={match.canCook}>
          {match.canCook
            ? '✓ 今すぐ作れます'
            : `あと${match.missingIngredients.length}品`}
        </Status>
        <h2>{recipe.name}</h2>
        <Meta>
          <span>⏱ {recipe.cookingTimeMinutes}分</span>
          <span>一致 {match.matchRate}%</span>
        </Meta>
        <Progress aria-label={`食材一致率${match.matchRate}%`}>
          <span style={{ width: `${match.matchRate}%` }} />
        </Progress>
      </Content>
    </RecipeLink>
  );
}

export default RecipeCard;
