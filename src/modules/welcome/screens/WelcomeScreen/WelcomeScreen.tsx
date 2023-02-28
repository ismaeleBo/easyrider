import React, { useCallback } from 'react';
import ButtonPrimary from 'easyrider/src/components/ButtonPrimary';
import ScrollContainer from 'easyrider/src/components/ScrollContainer';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import { View, Text } from 'react-native';
import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import { FontSize, FontWeight } from 'easyrider/src/assets/typgraphy';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  WelcomeStackParamList,
  WelcomeStackRouteNames,
} from 'easyrider/src/navigation/WelcomeStack/WelcomeStackParamList';
import Slider from 'easyrider/src/components/Slider';
import { slides } from './slides';

const WelcomeScreen: React.FC = () => {
  const [t] = useLanguage();
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const handleLogin = useCallback(() => {
    return navigation.navigate(WelcomeStackRouteNames.LOGIN);
  }, [navigation]);

  const handleSignUp = useCallback(() => {
    return navigation.navigate(WelcomeStackRouteNames.SIGNUP);
  }, [navigation]);

  return (
    <AnimatedContainerFull
      colorDark={DarkPalette.BackgroundPrimary}
      colorLight={LightPalette.BackgroundPrimary}
    >
      <View className='flex-1 items-center justify-center h-full mx-20'>
        <ScrollContainer>
          <Slider data={slides} />
          <View className='mt-20'>
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
          </View>
          <View className='mt-20 justify-center items-center'>
            <ButtonPrimary title={t('login')} onPress={handleLogin} />
            <ButtonPrimary
              title={t('signUp')}
              onPress={handleSignUp}
              customWrapper='bg-red-100 mt-20'
              customText='text-white'
            />
          </View>
        </ScrollContainer>
      </View>
    </AnimatedContainerFull>
  );
};

export default WelcomeScreen;
