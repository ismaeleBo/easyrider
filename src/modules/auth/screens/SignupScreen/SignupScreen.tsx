import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import { FontSize } from 'easyrider/src/assets/typgraphy';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import React from 'react';
import { View } from 'react-native';

const SignupScreen = () => {
  return (
    <AnimatedContainerFull
      colorLight={LightPalette.BackgroundPrimary}
      colorDark={DarkPalette.BackgroundPrimary}
    >
      <View className='justify-center items-center w-full h-full'>
        <AnimatedTextColor fontSize={FontSize.MEDIUM}>
          Signup Screen
        </AnimatedTextColor>
      </View>
    </AnimatedContainerFull>
  );
};

export default SignupScreen;
