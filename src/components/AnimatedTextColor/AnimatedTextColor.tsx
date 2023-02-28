import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import {
  FontFamily,
  FontSize,
  FontWeight,
  FontWeightType,
} from 'easyrider/src/assets/typgraphy';
import { AnimationTiming } from 'easyrider/src/assets/variables/variables';
import { useColorScheme } from 'nativewind';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedTextColorProps {
  children: ReactNode;
  colorLight?: string;
  colorDark?: string;
  duration?: number;
  fontSize?: number;
  fontWeight?: FontWeightType;
  textCenter?: boolean;
}

const AnimatedTextColor = ({
  children,
  colorDark = DarkPalette.TextPrimary,
  colorLight = LightPalette.TextPrimary,
  duration = AnimationTiming.BASE,
  fontSize = FontSize.SMALL,
  fontWeight = FontWeight.NORMAL,
  textCenter = false,
}: AnimatedTextColorProps): JSX.Element => {
  const { colorScheme } = useColorScheme();

  const progress = useDerivedValue(() => {
    return withTiming(colorScheme === 'dark' ? 1 : 0, { duration });
  });

  const styles = StyleSheet.create({
    text: {
      fontSize,
      fontWeight,
      fontFamily: FontFamily.DOSIS_REGULAR,
      textAlign: textCenter ? 'center' : 'left',
    },
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [colorLight, colorDark],
    );
    return {
      color,
    };
  });

  return (
    <Animated.Text style={[styles.text, textStyle]}>{children}</Animated.Text>
  );
};

export default AnimatedTextColor;
