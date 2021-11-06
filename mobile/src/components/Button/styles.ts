import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface WrapperProps {
  color?: string;
};

interface TitleProps {
  light: boolean;
}

export const Wrapper = styled(RectButton)<WrapperProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 19px;
  background: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light
    ? theme.colors.header
    : theme.colors.shape
  };
`;
