import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import PrivateStack from './src/navigation/PrivateStack';
import WelcomeStack from './src/navigation/WelcomeStack';

const App: React.FC = () => {
  const isLogged = false;

  return (
    <NavigationContainer>
      {isLogged ? <PrivateStack /> : <WelcomeStack />}
    </NavigationContainer>
  );
};

export default App;
