import { DarkPalette, LightPalette } from 'easyrider/src/assets/palette';
import { AnimationTiming } from 'easyrider/src/assets/variables/variables';
import { useColorScheme } from 'nativewind';
import React, { ReactNode } from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedContainerFullProps {
  children: ReactNode;
  colorLight?: string;
  colorDark?: string;
  duration?: number;
}

const AnimatedContainerFull = ({
  children,
  colorLight = LightPalette.BackgroundPrimary,
  colorDark = DarkPalette.BackgroundPrimary,
  duration = AnimationTiming.BASE,
}: AnimatedContainerFullProps): JSX.Element => {
  const { colorScheme } = useColorScheme();

  const progress = useDerivedValue(() => {
    return withTiming(colorScheme === 'dark' ? 1 : 0, { duration });
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colorLight, colorDark],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[{ height: '100%' }, backgroundStyle]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedContainerFull;
