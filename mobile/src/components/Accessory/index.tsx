import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';

import {
  Wrapper,
  Name,
} from './styles';

interface AccessoryProps {
  name: string;
  icon: React.FC<SvgProps>;
};

export const Accessory = ({
  name,
  icon: Icon
}: AccessoryProps) => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Icon
        height={32}
        width={32}
        fill={theme.colors.header}
      />
      <Name>{name}</Name>
    </Wrapper>
  );
};
