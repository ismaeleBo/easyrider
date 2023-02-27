import React, { useMemo } from 'react';
import { BaseColor } from 'easyrider/src/assets/palette/palette';
import { View } from 'react-native';
import { times } from 'lodash';

interface WelcomePagerIndicatorProps {
  activeColor?: string;
  currentPagePosition: number;
  inactiveColor?: string;
  dotSize?: number;
  numberOfPages: number;
}

const WelcomePagerIndicator = ({
  activeColor = BaseColor.BLACK,
  currentPagePosition,
  inactiveColor = BaseColor.WHITE,
  dotSize = 16,
  numberOfPages,
}: WelcomePagerIndicatorProps) => {
  const indicators = useMemo(
    () =>
      times(numberOfPages, (index: number) => {
        const isLastElement = index === numberOfPages - 1;
        const key = `indicator-${index}`;
        const marginEnd = isLastElement ? 0 : 20;
        const color =
          index === currentPagePosition ? activeColor : inactiveColor;

        return (
          <View key={key} className='items-center justify-center'>
            <View
              style={{
                backgroundColor: color,
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                marginRight: marginEnd,
              }}
            />
          </View>
        );
      }),
    [numberOfPages, currentPagePosition, activeColor, inactiveColor, dotSize],
  );

  return (
    <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
      {indicators}
    </View>
  );
};

export default WelcomePagerIndicator;
