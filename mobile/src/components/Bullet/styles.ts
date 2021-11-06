import styled from 'styled-components/native';

interface WrapperProps {
  active: boolean;
}

export const Wrapper = styled.View<WrapperProps>`
  height: 6px;
  width: 6px;
  background: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape
  };
  margin-left: 8px;
  border-radius: 3px;
`;
