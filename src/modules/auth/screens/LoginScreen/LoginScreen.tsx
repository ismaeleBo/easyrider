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
      <View className='justify-center items-center w-full h-full'>
        <Text className='text-24'>Login Screen</Text>
      </View>
    </AnimatedContainerFull>
  );
};

export default LoginScreen;
