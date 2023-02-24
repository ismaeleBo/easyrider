import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OverviewScreen from '../../modules/overview/screens/OverviewScreen';

const Stack = createNativeStackNavigator();

const PrivateStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={OverviewScreen}
        options={{ title: 'Bentornato' }}
      />
    </Stack.Navigator>
  );
};

export default PrivateStack;
