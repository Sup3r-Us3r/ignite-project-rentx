import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModelCar } from '../../database/models/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Wrapper,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles';

interface CarProps extends RectButtonProps {
  data: ModelCar;
};

export const Car = ({ data, ...rest }: CarProps) => {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  const netInfo = useNetInfo();

  return (
    <Wrapper {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              R$ {netInfo.isConnected === true ? data.price : '...'}
            </Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} />
    </Wrapper>
  );
};
