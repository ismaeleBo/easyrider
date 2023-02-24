import React, { ReactNode } from 'react';
import { FlexAlignType, ScrollView, StyleSheet } from 'react-native';

interface ScrollContainerProps {
  children: ReactNode;
  alignItems?: FlexAlignType;
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
}: ScrollContainerProps): JSX.Element => {
  const style = StyleSheet.create({
    scrollView: {
      height: '100%',
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
