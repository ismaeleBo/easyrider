import React, { ReactNode } from 'react';
import { FlexAlignType, ScrollView, StyleSheet } from 'react-native';

interface ScrollContainerProps {
  children: ReactNode;
  alignItems?: FlexAlignType;
  hFull?: boolean;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const ScrollContainer = ({
  children,
  alignItems = 'center',
  justifyContent = 'center',
  hFull = false,
}: ScrollContainerProps): JSX.Element => {
  const style = StyleSheet.create({
    scrollView: {
      height: hFull ? '100%' : undefined,
      display: 'flex',
      alignItems,
      justifyContent,
    },
  });
  return (
    <ScrollView contentContainerStyle={style.scrollView}>{children}</ScrollView>
  );
};

export default ScrollContainer;
