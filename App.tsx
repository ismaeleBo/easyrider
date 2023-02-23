import React from 'react';
import PrivateStack from './src/navigation/PrivateStack';
import WelcomeStack from './src/navigation/WelcomeStack';

const App: React.FC = () => {
  const isLogged = true;

  if (isLogged) {
    return <PrivateStack />;
  }

  return <WelcomeStack />;
};

export default App;
