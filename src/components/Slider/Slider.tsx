import { useDebounceFn } from 'ahooks';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEvent,
  PagerViewOnPageSelectedEvent,
} from 'react-native-pager-view';
import AnimatedTextColor from '../AnimatedTextColor';
import Indicator from '../Indicator';
import { FontSize } from 'easyrider/src/assets/typgraphy';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';

export interface Slide {
  image: ImageSourcePropType;
  title: string;
}

interface PagerProps {
  data: Slide[];
}

const Pager = ({ data }: PagerProps): JSX.Element => {
  const [t] = useLanguage();

  const pagerRef = useRef<PagerView>(null);
  const [currentPagePosition, setCurrentPagePosition] = useState(0);

  const { run: handleAutoScroll } = useDebounceFn(
    (nextPagePosition: number) => {
      const pager = pagerRef.current;
      if (pager) {
        if (nextPagePosition < data.length) {
          pager.setPage(nextPagePosition);
        } else {
          pager.setPage(0);
        }
      }
    },
    { wait: 4000 },
  );

  const handlePageScroll = useCallback((event: PagerViewOnPageScrollEvent) => {
    const { offset, position } = event.nativeEvent;
    const currentPage = Math.round(position + offset);
    setCurrentPagePosition(currentPage);
  }, []);

  const handlePageSelected = useCallback(
    (event: PagerViewOnPageSelectedEvent) => {
      const { position } = event.nativeEvent;
      handleAutoScroll(position + 1);
    },
    [handleAutoScroll],
  );

  const pages = useMemo(
    () =>
      data.map(({ title, image }, i) => (
        <View
          collapsable={false}
          key={`page-${i.toString()}`}
          className='justify-center items-center'
        >
          <Image source={image} resizeMode='contain' className='self-center' />
          <View className='mt-20 px-20'>
            <AnimatedTextColor textCenter fontSize={FontSize.SMALL}>
              {t(title as never)}
            </AnimatedTextColor>
          </View>
        </View>
      )),
    [data],
  );

  const styles = StyleSheet.create({
    pager: {
      width: '100%',
      height: 350,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <>
      <View className='w-full p-2  bg-white/50 rounded-lg'>
        <PagerView
          onPageScroll={handlePageScroll}
          onPageSelected={handlePageSelected}
          overdrag
          ref={pagerRef}
          style={styles.pager}
        >
          {pages}
        </PagerView>
      </View>
      <View className='mt-20'>
        <Indicator
          numberOfPages={data.length}
          currentPagePosition={currentPagePosition}
        />
      </View>
    </>
  );
};

export default Pager;
