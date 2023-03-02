import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import PrivateStack from './src/navigation/PrivateStack';
import WelcomeStack from './src/navigation/WelcomeStack';
import store from './src/store';

const App: React.FC = () => {
  const isLogged = false;

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogged ? <PrivateStack /> : <WelcomeStack />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
