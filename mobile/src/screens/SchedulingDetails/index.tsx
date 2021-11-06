import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

import {
  Wrapper,
  Header,
  CarImages,
  Content,
  Details,
  Accessories,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';

interface CarDetailsParams {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export const SchedulingDetails = () => {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState<boolean>(false);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const netInfo = useNetInfo();

  const { car, dates } = route.params as CarDetailsParams;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    api.post('/rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal,
    }).then(() => {
      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home',
      });
    })
    .catch(() => {
      setLoading(false);

      Alert.alert(
        'Agendamento não efetuado',
        'Não foi possível confirmar o agendamento',
      );
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(
        getPlatformDate(new Date(dates[0])),
        'dd/MM/yyyy',
      ),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get<CarDTO>(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Wrapper>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>
      
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          loading={loading}
          enabled={!loading}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Wrapper>
  );
};
