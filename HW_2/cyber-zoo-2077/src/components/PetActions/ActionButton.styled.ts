import styled from 'styled-components';

interface ActionButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const ActionButton = styled.button<ActionButtonProps>`
  border: none;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  margin: 0.15rem;
  min-width: 90px;

  background-color: ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return '#424242';
      case 'danger':
        return '#b71c1c';
      case 'primary':
      default:
        return '#1976d2';
    }
  }};
  color: #ffffff;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transform: translateY(0);
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.45);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;
