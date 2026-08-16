import { Link } from 'react-router';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const HeaderBar = styled.header`
  position: sticky;
  z-index: 20;
  top: 0;
  border-bottom: 1px solid rgba(222, 216, 204, 0.88);
  background: rgba(247, 243, 234, 0.92);
  backdrop-filter: blur(16px);
`;

const HeaderInner = styled.div`
  display: flex;
  width: min(100%, 720px);
  min-height: 4rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  padding: 0.55rem 1rem;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: ${theme.colors.primaryStrong};
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  text-decoration: none;
`;

const BrandMark = styled.span`
  width: 2.5rem;
  height: 2.5rem;
`;

const PantryCount = styled(Link)`
  display: inline-flex;
  min-height: 2.65rem;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.8rem;
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.surface};
  color: ${theme.colors.primaryStrong};
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
  box-shadow: ${theme.shadow.card};
`;

export function Header({ ingredientCount }: { ingredientCount: number }) {
  return (
    <HeaderBar>
      <HeaderInner>
        <Brand to="/" aria-label="まいにち冷蔵庫 ホーム">
          <BrandMark aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}app-icon.svg`}
              alt="まいにち冷蔵庫"
            />
          </BrandMark>
          まいにち冷蔵庫
        </Brand>
        <PantryCount to="/ingredients">
          <span aria-hidden="true">🥕</span>
          食材 {ingredientCount}件
        </PantryCount>
      </HeaderInner>
    </HeaderBar>
  );
}
