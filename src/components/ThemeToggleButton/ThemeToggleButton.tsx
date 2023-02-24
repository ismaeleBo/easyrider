import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useColorScheme } from 'nativewind';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import dark from '../../assets/icons/dark-mode.svg';
import light from '../../assets/icons/light-mode.svg';

const ThemeToggleButton = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const animation = useSharedValue(0);

  const rotation = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360]);
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value + 'deg' }],
    };
  });

  const toggleTheme = () => {
    toggleColorScheme();
    if (isDark) {
      animation.value = withDelay(20, withTiming(360, { duration: 1000 }));
      return;
    }
    animation.value = withDelay(20, withTiming(-360, { duration: 1000 }));
  };

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Animated.View style={[, animationStyle]}>
        <SvgXml xml={isDark ? light : dark} width={32} height={32} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
