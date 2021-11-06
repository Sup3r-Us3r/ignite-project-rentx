import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Wrapper = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 80px;
  background : ${({ theme }) => theme.colors.title};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(10)}px;
  color : ${({ theme }) => theme.colors.shape};
`;
