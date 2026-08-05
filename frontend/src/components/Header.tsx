import styled from "styled-components";
import { theme } from "../styles/theme";
import { Link } from "react-router";

const HeaderContainer = styled.header`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: 0 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const HeaderInner = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const HomeButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: ${theme.colors.text};
  font-size: 3rem;
  cursor: pointer;
  padding: 0.6rem;
  width: 4rem;
  height: 4rem;
  display: grid;
  place-items: center;

  &:hover {
    opacity: 0.85;
  }
`;

const HomeLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderInner>
        <HomeLink to="/">
          <HomeButton aria-label="ホームに戻る">⌂</HomeButton>
        </HomeLink>
        <h1>材料→レシピ検索アプリ</h1>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
