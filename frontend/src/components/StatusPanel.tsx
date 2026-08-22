import styled from 'styled-components';
import { theme } from '../styles/theme';

const Panel = styled.div<{ $tone: 'neutral' | 'warning' }>`
  padding: 1.25rem;
  border: 1px solid
    ${({ $tone }) =>
      $tone === 'warning' ? theme.colors.warning : theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${({ $tone }) =>
    $tone === 'warning' ? theme.colors.warningSoft : theme.colors.surface};
  text-align: center;

  span {
    display: block;
    margin-bottom: 0.55rem;
    font-size: 1.8rem;
  }

  strong {
    display: block;
    margin-bottom: 0.35rem;
  }

  p {
    margin: 0;
    color: ${theme.colors.textMuted};
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

type StatusPanelProps = {
  icon: string;
  title: string;
  description: string;
  tone?: 'neutral' | 'warning';
};

export function StatusPanel({
  icon,
  title,
  description,
  tone = 'neutral',
}: StatusPanelProps) {
  return (
    <Panel $tone={tone} role={tone === 'warning' ? 'alert' : 'status'}>
      <span aria-hidden="true">{icon}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </Panel>
  );
}
