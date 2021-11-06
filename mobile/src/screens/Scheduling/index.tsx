import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { format } from 'date-fns/esm';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval,
} from '../../components/Calendar';
import { getPlatformDate } from '../../utils/getPlatformDate';

import { CarDTO } from '../../dtos/CarDTO';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Wrapper,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface CarDetailsParams {
  car: CarDTO;
}

export const Scheduling = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as CarDetailsParams;
  const theme = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleConfirmRental() {
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[
      Object.keys(interval).length - 1
    ];

    setRentalPeriod({
      start: start.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      end: end.timestamp,
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
    });
  }

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

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue isSelected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue isSelected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Wrapper>
  );
};
