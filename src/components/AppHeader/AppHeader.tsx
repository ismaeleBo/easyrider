import React from 'react';
import { View } from 'react-native';
import ThemeToggleButton from '../ThemeToggleButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const AppHeader = () => {
  const { top } = useSafeAreaInsets();

  const hasIsland = top > 45;

  const headerMarginTop = hasIsland ? 'pt-50' : 'pt-30';

  const headerStyle = `${headerMarginTop} w-full justify-center items-end pr-12`;

  return (
    <View className={headerStyle}>
      <ThemeToggleButton />
    </View>
  );
};

export default AppHeader;
