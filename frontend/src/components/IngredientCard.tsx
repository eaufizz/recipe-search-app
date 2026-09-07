import styled from 'styled-components';
import { theme } from '../styles/theme';
import type { UserIngredient } from '../types/ingredient';
import Button from './Button';

const Item = styled.li`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
`;

const Details = styled.div`
  min-width: 0;

  strong {
    display: block;
    overflow-wrap: anywhere;
  }

  span {
    color: ${theme.colors.textMuted};
    font-size: 0.82rem;
  }
`;

type IngredientCardProps = {
  ingredient: UserIngredient;
  onRemove: (id: string) => void;
};

function IngredientCard({ ingredient, onRemove }: IngredientCardProps) {
  return (
    <Item>
      <Details>
        <strong>{ingredient.name}</strong>
      </Details>
      <Button
        type="button"
        variant="danger"
        onClick={() => onRemove(ingredient.id)}
        aria-label={`${ingredient.name}を削除`}
      >
        削除
      </Button>
    </Item>
  );
}

export default IngredientCard;
