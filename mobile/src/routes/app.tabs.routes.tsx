import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from './app.stack.routes';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabsRoutes = () => {
  const theme = useTheme();

  return (
    <Navigator
    initialRouteName="TabHome"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 78,
          backgroundColor: theme.colors.backgroundPrimary,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        },
      }}
    >
      <Screen
        name="TabHome"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="TabMyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color, size }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="TabProfile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};
