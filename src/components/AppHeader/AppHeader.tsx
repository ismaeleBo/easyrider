import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import ThemeToggleButton from '../ThemeToggleButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const AppHeader = () => {
  const { top } = useSafeAreaInsets();

  const hasIsland = top === 59;

  const headerMarginTop = hasIsland ? 'pt-50' : 'pt-20';

  const headerStyle = `${headerMarginTop} w-full justify-center items-end pr-12`;

  return (
    <View className={headerStyle}>
      <ThemeToggleButton />
    </View>
  );
};

export default AppHeader;
