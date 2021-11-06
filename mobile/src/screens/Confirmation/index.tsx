import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Wrapper,
  Content,
  Title,
  Message,
  Footer,
} from './styles';

interface ConfirmationParams {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export const Confirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    title,
    message,
    nextScreenRoute,
  } = route.params as ConfirmationParams;

  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute as any);
  }

  return (
    <Wrapper>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg height={80} width={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton
          title="OK"
          onPress={handleConfirm}
        />
      </Footer>
    </Wrapper>
  );
};
