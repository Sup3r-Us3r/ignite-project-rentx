import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Wrapper,
  Title,
} from './styles';

interface ConfirmButtonProps extends RectButtonProps {
  title: string;
}

export const ConfirmButton = ({ title, ...rest }: ConfirmButtonProps) => {
  return (
    <Wrapper {...rest}>
      <Title>{title}</Title>
    </Wrapper>
  );
};
