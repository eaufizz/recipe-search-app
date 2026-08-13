import { createGlobalStyle } from 'styled-components';
import { theme } from './theme.tsx';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${theme.colors.background};
  }
`;

export default GlobalStyle;
