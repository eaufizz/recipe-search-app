import styled from 'styled-components';
import { theme } from '../styles/theme';

const SearchField = styled.label`
  display: flex;
  min-height: 3.35rem;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadow.card};

  &:focus-within {
    border-color: ${theme.colors.primary};
  }

  span {
    font-size: 1.15rem;
  }

  input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${theme.colors.text};
    font-size: 1rem;
  }

  input::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <SearchField>
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="食材名を入力（例：玉ねぎ）"
        aria-label="食材名で検索"
      />
    </SearchField>
  );
}

export default SearchBox;
