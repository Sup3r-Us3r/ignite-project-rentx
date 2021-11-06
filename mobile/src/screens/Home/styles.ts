import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Car as ModelCar } from '../../database/models/Car';

export const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Header = styled.View`
  justify-content: flex-end;
  width: 100%;
  height: 113px;
  background: ${({ theme }) => theme.colors.header};
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalCars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<ModelCar>).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
