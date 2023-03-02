import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontSize, FontWeight } from 'easyrider/src/assets/typgraphy';
import AnimatedContainerFull from 'easyrider/src/components/AnimatedContainerFull';
import AnimatedTextColor from 'easyrider/src/components/AnimatedTextColor';
import ButtonPrimary from 'easyrider/src/components/ButtonPrimary';
import ScrollContainer from 'easyrider/src/components/ScrollContainer';
import {
  WelcomeStackParamList,
  WelcomeStackRouteNames,
} from 'easyrider/src/navigation/WelcomeStack/WelcomeStackParamList';
import React from 'react';
import { View } from 'react-native';

const SignupSuccessScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const handleSubmit = () => {
    navigation.navigate(WelcomeStackRouteNames.LOGIN);
  };
  return (
    <AnimatedContainerFull>
      <ScrollContainer hFull>
        <View className='mx-20'>
          <AnimatedTextColor
            fontSize={FontSize.LARGE}
            fontWeight={FontWeight.BOLD}
            textCenter
          >
            La registrazione è andata a buon fine!
          </AnimatedTextColor>
          <View className='mt-20'>
            <ButtonPrimary title='VAI AL LOGIN' onPress={handleSubmit} />
          </View>
        </View>
      </ScrollContainer>
    </AnimatedContainerFull>
  );
};

export default SignupSuccessScreen;
