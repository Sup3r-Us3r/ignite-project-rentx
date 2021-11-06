import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { api } from '../../services/api';
import { database } from '../../database';
import { Car as ModelCar } from '../../database/models/Car';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import LogoSvg from '../../assets/logo.svg';

import {
  Wrapper,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

export const Home = () => {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const theme = useTheme();

  const netInfo = useNetInfo();

  const positionX = useSharedValue<number>(0);
  const positionY = useSharedValue<number>(0);

  const myCarsButtonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
          .get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion }: any = response.data;
        console.log(changes);
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        api.post('/users/sync', user)
          .then(() => true)
          .catch(error => console.log(error));
      },
    });
  }

  function handleCarDetails(car: ModelCar) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        setIsLoading(true);

        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  return (
    <Wrapper>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <LogoSvg
            height={RFValue(12)}
            width={RFValue(108)}
          />
          {
            !isLoading &&
            <TotalCars>
              Total de {cars.length}
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      {
        isLoading ? <LoadAnimation /> :
          <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Car
                data={item}
                onPress={() => handleCarDetails(item)}
              />
            )}
          />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            right: 22,
            bottom: 22,
          },
        ]}>
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
