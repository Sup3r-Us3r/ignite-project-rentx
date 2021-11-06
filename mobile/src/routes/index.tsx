import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/useAuth';
import { Car as ModelCar } from '../database/models/Car';
import { CarDTO } from '../dtos/CarDTO';
import { AppTabsRoutes } from './app.tabs.routes';
import { AuthRoutes } from './auth.routes';
import { LoadAnimation } from '../components/LoadAnimation';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: undefined;
      SignIn: undefined;
      SignUpFirstStep: undefined;
      SignUpSecondStep: {
        user: {
          name: string;
          email: string;
          driverLicense: string;
        };
      };
      Home: undefined;
      CarDetails: {
        car: ModelCar;
      };
      Scheduling: {
        car: CarDTO;
      };
      SchedulingDetails: {
        car: CarDTO;
        dates: string[];
      };
      Confirmation: {
        title: string;
        message: string;
        nextScreenRoute: string;
      };
      MyCars: undefined;
    }
  }
}

export const Routes = () => {
  const { user, loading } = useAuth();

  return (
    loading ? <LoadAnimation /> :
    <NavigationContainer>
      { user.id ? <AppTabsRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  );
};
