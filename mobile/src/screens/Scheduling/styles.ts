import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface DateValueProps {
  isSelected: boolean;
};

export const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const Header = styled.View`
  justify-content: center;
  height: 325px;
  width: 100%;
  background: ${({ theme }) => theme.colors.header};
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(34)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const RentalPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  border-bottom-color: ${({ theme, isSelected }) => isSelected
    ? 'transparent'
    : theme.colors.text
  };
  border-bottom-width: 1px;
  padding-bottom: 5px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  padding: 24px;
`;
