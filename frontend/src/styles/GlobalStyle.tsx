import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family:
      Inter, "Hiragino Sans", "Yu Gothic", Meiryo, system-ui, -apple-system,
      sans-serif;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    min-width: 0;
    min-height: 100vh;
    background:
      radial-gradient(circle at 100% 0%, rgba(219, 90, 58, 0.08), transparent 28rem),
      ${theme.colors.background};
  }

  button,
  input,
  select {
    font: inherit;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 3px solid ${theme.colors.accent};
    outline-offset: 3px;
  }

  a {
    color: inherit;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  #root {
    min-height: 100vh;
  }
`;

export default GlobalStyle;
