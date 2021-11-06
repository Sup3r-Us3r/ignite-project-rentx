import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Wrapper = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 132px;
  width: ${Dimensions.get('window').width}px;
`;

export const CarImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  height: 132px;
  width: 280px;
`;
