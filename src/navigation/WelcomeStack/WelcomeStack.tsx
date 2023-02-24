import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../../modules/welcome/screens/WelcomeScreen';
import AppHeader from 'easyrider/src/components/AppHeader';

const Stack = createNativeStackNavigator();

const WelcomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppHeader,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
