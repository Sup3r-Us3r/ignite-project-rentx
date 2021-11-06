import styled from 'styled-components/native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: 'center',
  },
  showsVerticalScrollIndicator: false,
})``;

export const Details = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 38px;
`;

export const Accessories = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const RentalPeriod = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  padding-bottom: 16px;
`;

export const CalendarIcon = styled.View`
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background: ${({ theme }) => theme.colors.main};
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  text-transform: uppercase;
`;

export const RentalPrice = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const RentalPriceLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const RentalPriceDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RentalPriceQuota = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  text-transform: uppercase;
`;

export const RentalPriceTotal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.success};
  text-transform: uppercase;
`;


export const Footer = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 24px;
  padding-bottom: ${getBottomSpace() + 24}px;
`;
