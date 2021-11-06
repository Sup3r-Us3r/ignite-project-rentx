import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import {
  Wrapper,
} from './styles';

export const Splash = () => {
  const navigation = useNavigation();

  const splashAnimation = useSharedValue<number>(0);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 50],
      [1, 0],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [0, -50],
          Extrapolate.CLAMP,
        ),
      }
    ],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      splashAnimation.value,
      [0, 25, 50],
      [0, 0.3, 1],
      Extrapolate.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          splashAnimation.value,
          [0, 50],
          [-50, 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  function startApp() {
    navigation.navigate('SignIn');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 1000 },
      () => {
        'worklet';
        runOnJS(startApp)();
      },
    );
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <Wrapper>
      <Animated.View
        style={[{ position: 'absolute' }, brandStyle]}
      >
        <BrandSvg height={50} width={80} />
      </Animated.View>

      <Animated.View
        style={[{ position: 'absolute' }, logoStyle]}
      >
        <LogoSvg height={20} width={180} />
      </Animated.View>
    </Wrapper>
  );
};
