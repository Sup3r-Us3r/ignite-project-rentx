import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
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
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 16px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const AppointmentsQuantity = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px;
  margin-top: -10px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const CarFooterTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.title};
  text-transform: uppercase;
`;
