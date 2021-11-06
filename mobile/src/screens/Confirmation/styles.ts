import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.header};
  padding-top: 96px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: 40px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  line-height: ${RFValue(25)}px;
  margin-top: 16px;
`;

export const Footer = styled.View`
  align-items: center;
  margin: 80px 0;
  width: 100%;
`;
