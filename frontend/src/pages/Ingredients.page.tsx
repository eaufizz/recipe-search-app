import { useMemo, useState, type FormEvent } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import IngredientCard from '../components/IngredientCard';
import SearchBox from '../components/SearchBox';
import { StatusPanel } from '../components/StatusPanel';
import { ingredients as ingredientCatalog } from '../data/ingredients';
import { theme } from '../styles/theme';
import {
  Card,
  Eyebrow,
  Lead,
  Page,
  PageHeader,
  PageTitle,
  PrimaryLink,
  Section,
  SectionHeading,
} from '../styles/ui';
import {
  ingredientCategoryLabels,
  type Ingredient,
  type IngredientCategory,
  type UserIngredient,
} from '../types/ingredient';

const CategoryList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.85rem -1rem 0;
  padding: 0 1rem 0.35rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  min-height: 2.7rem;
  flex: 0 0 auto;
  padding: 0.55rem 0.85rem;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  border-radius: ${theme.radius.pill};
  background: ${({ $active }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.text)};
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
`;

const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  margin-top: 1rem;

  @media (min-width: 560px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const CatalogButton = styled.button<{ $selected: boolean }>`
  display: grid;
  min-width: 0;
  min-height: 5.6rem;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${({ $selected }) =>
    $selected ? theme.colors.primarySoft : theme.colors.surface};
  color: ${theme.colors.text};
  text-align: left;
  cursor: ${({ $selected }) => ($selected ? 'default' : 'pointer')};

  span:first-child {
    font-size: 1.5rem;
  }

  strong {
    display: block;
    overflow-wrap: anywhere;
    font-size: 0.9rem;
  }

  small {
    color: ${theme.colors.textMuted};
  }
`;

const AddRow = styled.div`
  margin-top: 0.75rem;
`;

const PantryCard = styled(Card)`
  padding: 0.25rem 1rem;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const StickyAction = styled.div`
  position: sticky;
  z-index: 10;
  bottom: 4.9rem;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding: 0.75rem;
  border: 1px solid rgba(222, 216, 204, 0.9);
  border-radius: ${theme.radius.large};
  background: rgba(255, 253, 248, 0.95);
  box-shadow: ${theme.shadow.elevated};
  backdrop-filter: blur(12px);

  a {
    width: 100%;
  }
`;

type IngredientsPageProps = {
  userIngredients: UserIngredient[];
  storageMessage?: string;
  onAdd: (ingredient: Omit<UserIngredient, 'id'>) => void;
  onRemove: (id: string) => void;
};

const categories: Array<'all' | IngredientCategory> = [
  'all',
  'vegetable',
  'meat',
  'seafood',
  'dairy',
  'staple',
  'seasoning',
];

function IngredientsPage({
  userIngredients,
  storageMessage,
  onAdd,
  onRemove,
}: IngredientsPageProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | IngredientCategory>('all');
  const [unit, setUnit] = useState('');

  const filteredIngredients = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('ja');
    return ingredientCatalog.filter(
      (ingredient) =>
        (category === 'all' || ingredient.category === category) &&
        ingredient.name.toLocaleLowerCase('ja').includes(normalizedQuery),
    );
  }, [category, query]);

  const isSelected = (ingredient: Ingredient) =>
    userIngredients.some(
      (registered) => registered.ingredientId === ingredient.id,
    );

  const addIngredient = (name: string, catalogIngredient?: Ingredient) => {
    onAdd({
      ingredientId: catalogIngredient?.id,
      name: name.trim(),
      unit: unit || undefined,
    });
    setQuery('');
    setUnit('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const name = query.trim();
    if (!name) return;
    const exactIngredient = ingredientCatalog.find(
      (ingredient) =>
        ingredient.name.toLocaleLowerCase('ja') ===
        name.toLocaleLowerCase('ja'),
    );
    addIngredient(name, exactIngredient);
  };

  return (
    <Page>
      <PageHeader>
        <Eyebrow>My pantry</Eyebrow>
        <PageTitle>冷蔵庫の食材</PageTitle>
        <Lead>
          名前だけでも登録できます。数量と単位は、必要なときだけ追加してください。
        </Lead>
      </PageHeader>

      {storageMessage && (
        <StatusPanel
          icon="!"
          title="保存データのお知らせ"
          description={storageMessage}
          tone="warning"
        />
      )}

      <form onSubmit={handleSubmit}>
        <SearchBox value={query} onChange={setQuery} />
        <CategoryList aria-label="食材カテゴリ">
          {categories.map((item) => (
            <CategoryButton
              key={item}
              type="button"
              $active={category === item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item === 'all' ? 'すべて' : ingredientCategoryLabels[item]}
            </CategoryButton>
          ))}
        </CategoryList>
        <AddRow>
          <Button type="submit" fullWidth disabled={!query.trim()}>
            「{query.trim() || '食材名'}」を登録
          </Button>
        </AddRow>
      </form>

      <CatalogGrid aria-label="食材候補">
        {filteredIngredients.map((ingredient) => {
          const selected = isSelected(ingredient);
          return (
            <CatalogButton
              key={ingredient.id}
              type="button"
              $selected={selected}
              disabled={selected}
              aria-pressed={selected}
              onClick={() => addIngredient(ingredient.name, ingredient)}
            >
              <span aria-hidden="true">{ingredient.emoji}</span>
              <span>
                <strong>{ingredient.name}</strong>
                <small>{selected ? '登録済み ✓' : 'タップで追加'}</small>
              </span>
            </CatalogButton>
          );
        })}
      </CatalogGrid>

      {filteredIngredients.length === 0 && query.trim() && (
        <Section>
          <StatusPanel
            icon="＋"
            title="候補にない食材も登録できます"
            description="上の登録ボタンから、入力した名前のまま追加してください。"
          />
        </Section>
      )}

      <Section>
        <SectionHeading>
          <h2>登録中の食材</h2>
          <span>{userIngredients.length}件</span>
        </SectionHeading>
        {userIngredients.length > 0 ? (
          <PantryCard>
            <ul>
              {userIngredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.id}
                  ingredient={ingredient}
                  onRemove={onRemove}
                />
              ))}
            </ul>
          </PantryCard>
        ) : (
          <StatusPanel
            icon="🧺"
            title="食材はまだありません"
            description="検索またはカテゴリから、冷蔵庫にあるものを追加しましょう。"
          />
        )}
      </Section>

      {userIngredients.length > 0 && (
        <StickyAction>
          <PrimaryLink to="/recipes">この食材でレシピを探す →</PrimaryLink>
        </StickyAction>
      )}
    </Page>
  );
}

export default IngredientsPage;
