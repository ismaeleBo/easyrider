import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../modules/welcome/screens/WelcomeScreen';
import AppHeader from 'easyrider/src/components/AppHeader';
import LoginScreen from 'easyrider/src/modules/auth/screens/LoginScreen';
import {
  WelcomeStackParamList,
  WelcomeStackRouteNames,
} from './WelcomeStackParamList';
import SignupScreen from 'easyrider/src/modules/auth/screens/SignupScreen';
import SignupSuccessScreen from 'easyrider/src/modules/auth/screens/SignupSuccessScreen';

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppHeader,
        headerTransparent: true,
        animation: 'slide_from_right',
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
      <Stack.Screen
        name={WelcomeStackRouteNames.SIGNUP}
        component={SignupScreen}
      />
      <Stack.Screen
        name={WelcomeStackRouteNames.SIGNUP_SUCCESS}
        component={SignupSuccessScreen}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
