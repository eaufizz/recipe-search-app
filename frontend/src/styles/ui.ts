import { Link } from 'react-router';
import styled from 'styled-components';
import { theme } from './theme';

export const Page = styled.main`
  width: min(100%, 720px);
  margin: 0 auto;
  padding: 1.25rem 1rem 8.5rem;

  @media (min-width: 640px) {
    padding-inline: 1.5rem;
  }
`;

export const PageHeader = styled.header`
  margin-bottom: 1.5rem;
`;

export const Eyebrow = styled.p`
  margin: 0 0 0.35rem;
  color: ${theme.colors.accent};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.7rem, 7vw, 2.4rem);
  line-height: 1.18;
  letter-spacing: -0.035em;
`;

export const Lead = styled.p`
  margin: 0.65rem 0 0;
  color: ${theme.colors.textMuted};
  font-size: 0.96rem;
  line-height: 1.75;
`;

export const Card = styled.section`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background: ${theme.colors.surface};
  box-shadow: ${theme.shadow.card};
`;

export const Section = styled.section`
  margin-top: 1.75rem;
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;

  h2 {
    margin: 0;
    font-size: 1.12rem;
  }

  span {
    color: ${theme.colors.textMuted};
    font-size: 0.82rem;
  }
`;

export const PrimaryLink = styled(Link)`
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.8rem 1.15rem;
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-weight: 800;
  text-decoration: none;
  box-shadow: ${theme.shadow.card};

  &:hover {
    background: ${theme.colors.primaryStrong};
  }
`;

export const SecondaryLink = styled(Link)`
  display: inline-flex;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.7rem 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.surface};
  color: ${theme.colors.primaryStrong};
  font-weight: 750;
  text-decoration: none;
`;
