import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProperties } from 'react-native-gesture-handler';

import {
  Wrapper,
  Title,
} from './styles';

interface ButtonProps extends RectButtonProperties {
  title: string;
  color?: string;
  loading?: boolean;
  light?: boolean;
};

export const Button = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: ButtonProps) => {
  const theme = useTheme();

  return (
    <Wrapper
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{
        opacity: (enabled === false || loading === true) ? 0.5 : 1
      }}
      {...rest}
    >
      {
        loading
          ? <ActivityIndicator color={theme.colors.shape} />
          : <Title light={light}>{title}</Title>
      }
    </Wrapper>
  );
};
