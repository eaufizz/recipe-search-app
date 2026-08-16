import styled from 'styled-components';
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
  SecondaryLink,
} from '../styles/ui';
import type { UserIngredient } from '../types/ingredient';

const Hero = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 1.35rem;
  background: ${theme.colors.primaryStrong};
  color: ${theme.colors.white};

  &::after {
    position: absolute;
    right: -2rem;
    bottom: -2rem;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.07);
    content: '';
  }
`;

const Count = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;

  strong {
    font-size: 3.4rem;
    line-height: 1;
    letter-spacing: -0.06em;
  }

  span {
    padding-bottom: 0.35rem;
    color: rgba(255, 255, 255, 0.72);
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;

  a:first-child {
    background: ${theme.colors.white};
    color: ${theme.colors.primaryStrong};
  }

  a:last-child {
    border-color: rgba(255, 255, 255, 0.35);
    background: transparent;
    color: ${theme.colors.white};
  }
`;

const IngredientChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.span`
  max-width: 100%;
  overflow: hidden;
  padding: 0.55rem 0.75rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.surface};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Steps = styled.ol`
  display: grid;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: 2.4rem minmax(0, 1fr);
    align-items: center;
    gap: 0.75rem;
  }

  b {
    display: grid;
    width: 2.4rem;
    height: 2.4rem;
    place-items: center;
    border-radius: 50%;
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.accent};
  }

  span {
    color: ${theme.colors.textMuted};
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

function HomePage({ ingredients }: { ingredients: UserIngredient[] }) {
  return (
    <Page>
      <PageHeader>
        <Eyebrow>Cook with what you have</Eyebrow>
        <PageTitle>あるもので、今日のごはん。</PageTitle>
        <Lead>
          冷蔵庫の食材を登録すると、今すぐ作れる料理と、あと少しで作れる料理を提案します。
        </Lead>
      </PageHeader>

      <Hero>
        <Count>
          <strong>{ingredients.length}</strong>
          <span>件の食材を登録中</span>
        </Count>
        <HeroActions>
          <PrimaryLink to="/ingredients">
            {ingredients.length > 0 ? '食材を見直す' : '食材を登録する'}
          </PrimaryLink>
          {ingredients.length > 0 && (
            <SecondaryLink to="/recipes">レシピを探す →</SecondaryLink>
          )}
        </HeroActions>
      </Hero>

      {ingredients.length > 0 && (
        <Section>
          <SectionHeading>
            <h2>いまある食材</h2>
            <span>最大6件を表示</span>
          </SectionHeading>
          <IngredientChips>
            {ingredients.slice(0, 6).map((ingredient) => (
              <Chip key={ingredient.id}>{ingredient.name}</Chip>
            ))}
          </IngredientChips>
        </Section>
      )}

      <Section>
        <SectionHeading>
          <h2>使い方</h2>
        </SectionHeading>
        <Steps>
          <li>
            <b>1</b>
            <span>冷蔵庫にある食材を、名前だけで気軽に登録</span>
          </li>
          <li>
            <b>2</b>
            <span>一致度と不足食材を見ながら、料理を選ぶ</span>
          </li>
          <li>
            <b>3</b>
            <span>手順を確認して、余りものをおいしく使い切る</span>
          </li>
        </Steps>
      </Section>
    </Page>
  );
}

export default HomePage;
