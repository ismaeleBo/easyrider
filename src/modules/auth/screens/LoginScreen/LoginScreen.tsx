import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import React from 'react';
import { Text, View } from 'react-native';

const LoginScreen = () => {
  return (
    <AnimatedContainerFull
      colorLight={LightPalette.BackgroundPrimary}
      colorDark={DarkPalette.BackgroundPrimary}
    >
      <Text className='text-24'>Login Screen</Text>
    </AnimatedContainerFull>
  );
};

export default LoginScreen;
