import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput as TextInputRN } from 'react-native';

interface TextInputProps {
  isFocused: boolean;
}

interface IconContainerProps {
  isFocused: boolean;
}

export const Wrapper = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<IconContainerProps>`
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  margin-right: 2px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-color: ${theme.colors.main};
  `};
`;

export const TextInput = styled(TextInputRN)<TextInputProps>`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 0 23px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-color: ${theme.colors.main};
  `};
`;
