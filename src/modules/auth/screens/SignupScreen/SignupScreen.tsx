import React from 'react';
import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import { FontSize, FontWeight } from 'easyrider/src/assets/typgraphy';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import { View } from 'react-native';
import SignupForm from '../../components/SignupForm';
import ScrollContainer from 'easyrider/src/components/ScrollContainer';

const SignupScreen = () => {
  const [t] = useLanguage();
  return (
    <AnimatedContainerFull
      colorLight={LightPalette.BackgroundPrimary}
      colorDark={DarkPalette.BackgroundPrimary}
    >
      <View className='justify-center items-center w-full h-full'>
        <ScrollContainer>
          <View className='my-100 justify-center items-center'>
            <View className='mb-30'>
              <AnimatedTextColor
                fontSize={FontSize.LARGE}
                fontWeight={FontWeight.BOLD}
              >
                {t('signupTitle')}
              </AnimatedTextColor>
              <AnimatedTextColor
                fontSize={FontSize.MEDIUM}
                fontWeight={FontWeight.MEDIUM}
              >
                {t('signupDescription')}
              </AnimatedTextColor>
            </View>
            <SignupForm />
          </View>
        </ScrollContainer>
      </View>
    </AnimatedContainerFull>
  );
};

export default SignupScreen;
