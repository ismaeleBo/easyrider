import React from 'react';
import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import { FontSize } from 'easyrider/src/assets/typgraphy';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import { View } from 'react-native';
import SignupForm from '../../components/SignupForm';

const SignupScreen = () => {
  const [t] = useLanguage();
  return (
    <AnimatedContainerFull
      colorLight={LightPalette.BackgroundPrimary}
      colorDark={DarkPalette.BackgroundPrimary}
    >
      <View className='justify-center items-center w-full h-full'>
        <AnimatedTextColor fontSize={FontSize.MEDIUM}>
          {t('signupTitle')}
        </AnimatedTextColor>
        <AnimatedTextColor fontSize={FontSize.SMALL}>
          {t('signupDescription')}
        </AnimatedTextColor>
        <SignupForm />
      </View>
    </AnimatedContainerFull>
  );
};

export default SignupScreen;
