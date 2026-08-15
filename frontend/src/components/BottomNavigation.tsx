import { NavLink } from "react-router";
import styled from "styled-components";
import { theme } from "../styles/theme";

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
