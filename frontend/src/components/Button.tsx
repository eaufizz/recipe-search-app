import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.7rem 1rem;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'secondary' ? theme.colors.border : 'transparent'};
  border-radius: ${theme.radius.pill};
  background: ${({ $variant }) => {
    if ($variant === 'primary') return theme.colors.primary;
    if ($variant === 'danger') return theme.colors.accentSoft;
    if ($variant === 'secondary') return theme.colors.surface;
    return 'transparent';
  }};
  color: ${({ $variant }) => {
    if ($variant === 'primary') return theme.colors.white;
    if ($variant === 'danger') return theme.colors.error;
    return theme.colors.primaryStrong;
  }};
  font-weight: 800;
  cursor: pointer;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Button({
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) {
  return <StyledButton $variant={variant} $fullWidth={fullWidth} {...props} />;
}

export default Button;
