import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export const Wrapper = styled(RectButton)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 126px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const About = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.main};
  text-transform: uppercase;
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  height: 85px;
  width: 167px;
`;
