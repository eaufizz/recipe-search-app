import { Link, NavLink } from 'react-router';
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
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 14px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 1.25rem;
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

const BottomBar = styled.nav`
  position: fixed;
  z-index: 30;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0.5rem max(0.75rem, env(safe-area-inset-right))
    calc(0.5rem + env(safe-area-inset-bottom))
    max(0.75rem, env(safe-area-inset-left));
  border-top: 1px solid ${theme.colors.border};
  background: rgba(255, 253, 248, 0.96);
  backdrop-filter: blur(18px);
`;

const BottomInner = styled.div`
  display: grid;
  width: min(100%, 540px);
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  margin: 0 auto;
`;

const NavItem = styled(NavLink)`
  display: flex;
  min-height: 3.35rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  border-radius: ${theme.radius.medium};
  color: ${theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 750;
  text-decoration: none;

  span {
    font-size: 1.15rem;
    line-height: 1;
  }

  &.active {
    background: ${theme.colors.primarySoft};
    color: ${theme.colors.primaryStrong};
  }
`;

export function Header({ ingredientCount }: { ingredientCount: number }) {
  return (
    <HeaderBar>
      <HeaderInner>
        <Brand to="/" aria-label="まいにち冷蔵庫 ホーム">
          <BrandMark aria-hidden="true">♻</BrandMark>
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

export function BottomNavigation() {
  return (
    <BottomBar aria-label="メインナビゲーション">
      <BottomInner>
        <NavItem to="/" end>
          <span aria-hidden="true">⌂</span>
          ホーム
        </NavItem>
        <NavItem to="/ingredients">
          <span aria-hidden="true">🥕</span>
          食材
        </NavItem>
        <NavItem to="/recipes">
          <span aria-hidden="true">🍳</span>
          レシピ
        </NavItem>
      </BottomInner>
    </BottomBar>
  );
}
