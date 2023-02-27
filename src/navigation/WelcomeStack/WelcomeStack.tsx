import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../modules/welcome/screens/WelcomeScreen';
import AppHeader from 'easyrider/src/components/AppHeader';
import LoginScreen from 'easyrider/src/modules/auth/screens/LoginScreen';
import {
  WelcomeStackParamList,
  WelcomeStackRouteNames,
} from './WelcomeStackParamList';

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppHeader,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name={WelcomeStackRouteNames.WELCOME}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name={WelcomeStackRouteNames.LOGIN}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
