import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { format, parseISO } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { api } from '../../services/api';
import { Car as ModelCar } from '../../database/models/Car';

import {
  Wrapper,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarDataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export const MyCars = () => {
  const [cars, setCars] = useState<CarDataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  const screenIsFocus = useIsFocused();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get<CarDataProps[]>('/rentals');
        const dataFormatted = response.data.map(data => ({
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        }));

        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <Wrapper>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton
          color={theme.colors.shape}
          onPress={handleBack}
        />
        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <SubTitle>Conforto segurança e praticidade</SubTitle>
      </Header>

      {
        loading ? <LoadAnimation /> :
          <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>PERÍODO</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Wrapper>
  );
};
