import React from 'react';
import ButtonPrimary from 'easyrider/src/components/ButtonPrimary';
import ScrollContainer from 'easyrider/src/components/ScrollContainer';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import { View, Text } from 'react-native';
import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import { FontSize, FontWeight } from 'easyrider/src/assets/typgraphy';
import { AnimationTiming } from 'easyrider/src/assets/variables/variables';

const WelcomeScreen: React.FC = () => {
  const [t] = useLanguage();

  const handleLogin = () => console.log('LOGIN PRESSED');
  const handleSignUp = () => console.log('SIGNUP PRESSED');

  return (
    <AnimatedContainerFull
      colorDark={DarkPalette.BackgroundPrimary}
      colorLight={LightPalette.BackgroundPrimary}
    >
      <View className='flex-1 items-center justify-center h-full px-20'>
        <ScrollContainer>
          <AnimatedTextColor
            fontSize={FontSize.LARGE}
            fontWeight={FontWeight.BOLD}
            textCenter
          >
            {t('welcome')}
          </AnimatedTextColor>
          <AnimatedTextColor textCenter>
            {t('welcomeDescription')}
          </AnimatedTextColor>
          <View className='mt-30'>
            <ButtonPrimary title={t('login')} onPress={handleLogin} />
            <ButtonPrimary
              title={t('signUp')}
              onPress={handleSignUp}
              customWrapper='bg-red mt-20'
              customText='text-white'
            />
          </View>
        </ScrollContainer>
      </View>
    </AnimatedContainerFull>
  );
};

export default WelcomeScreen;
