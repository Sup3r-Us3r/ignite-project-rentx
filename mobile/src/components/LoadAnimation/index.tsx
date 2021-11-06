import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCarAnimation from '../../assets/loadingCarAnimation.json';

import {
  Wrapper,
} from './styles';

export const LoadAnimation = () => {
  return (
    <Wrapper>
      <LottieView
        source={loadingCarAnimation}
        autoPlay
        loop
        resizeMode="contain"
        style={{ height: 150 }}
      />
    </Wrapper>
  );
};
