import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { Car as ModelCar } from '../../database/models/Car';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Wrapper,
  Header,
  CarImages,
  Details,
  Accessories,
  About,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Footer,
  OfflineInfo,
} from './styles';

interface CarDetailsParams {
  car: ModelCar;
}

export const CarDetails = () => {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as CarDetailsParams;
  const theme = useTheme();
  const netInfo = useNetInfo();

  const scrollY = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, 200],
      [200, 80],
      Extrapolate.CLAMP,
    ),
  }));

  const sliderCarsStyleAnimation = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 150],
      [1, 0],
      Extrapolate.CLAMP,
    ),
  }));

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  function handleBack() {
    navigation.goBack();
  }

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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.backgroundSecondary },
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View
          style={[sliderCarsStyleAnimation]}
        >
          <CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$ {netInfo.isConnected === true ? car.price : '...'}
            </Price>
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

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes, e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
});
