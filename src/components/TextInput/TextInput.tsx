import { BaseColor } from 'easyrider/src/assets/palette/palette';
import useAutoFocus from 'easyrider/src/hooks/useAutoFocus';
import { useColorScheme } from 'nativewind';
import React, { Ref, useCallback, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TextInputRef = Ref<{ focus: () => void }>;

const ANIMATION_DURATION = 180;

const DO_NOTHING = () => {
  /* empty */
};

type RNTextInputPropsWithoutOverrides = Omit<
  RNTextInputProps,
  | 'disabledFullscreenUI'
  | 'editable'
  | 'keyboardAppearance'
  | 'onBlur'
  | 'onChangeText'
  | 'onFocus'
  | 'selectionColor'
  | 'style'
  | 'value'
>;

export interface TextInputProps extends RNTextInputPropsWithoutOverrides {
  value?: string;
  placeholder?: string;
  errorMessage?: string;
  hint?: string;
  iconName?: string;
  iconSize?: number;
  disabled?: boolean;
  iconDisabled?: boolean;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  onPressIcon?: () => void;
  showMaxLengthHint?: boolean;
  marginBottom?: number;
}

const TextInput = (
  {
    autoFocus,
    value = '',
    placeholder = '',
    errorMessage = undefined,
    hint = undefined,
    iconName = undefined,
    iconSize = 26,
    disabled = false,
    iconDisabled = false,
    maxLength,
    onChangeText = DO_NOTHING,
    onBlur = DO_NOTHING,
    onFocus = DO_NOTHING,
    onPressIcon = DO_NOTHING,
    showMaxLengthHint,
    autoCapitalize,
    marginBottom,
    ...rest
  }: TextInputProps,
  ref: TextInputRef,
) => {
  const textInputRef = useRef<RNTextInput>(null);
  const [active, setActive] = useState(false);
  const minimized = useSharedValue(value?.length ? 1 : 0);
  const border = useSharedValue(BaseColor.LIGHT_YELLOW);

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setActive(false);
    border.value = withTiming(BaseColor.LIGHT_YELLOW, {
      duration: ANIMATION_DURATION,
    });
    onBlur(event);
    if (!value) {
      restorePlaceholder();
    }
  };

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setActive(true);
    border.value = withTiming(BaseColor.GREEN, {
      duration: ANIMATION_DURATION,
    });
    onFocus(event);
    if (!value) {
      minimizePlaceholder();
    }
  };

  const focusTextInput = useCallback(() => textInputRef.current?.focus(), []);

  const minimizePlaceholder = () => {
    minimized.value = withTiming(1, {
      duration: ANIMATION_DURATION,
    });
  };

  const restorePlaceholder = () => {
    minimized.value = withTiming(0, {
      duration: ANIMATION_DURATION,
    });
  };

  const { colorScheme } = useColorScheme();

  const placeholderContainerStyle: ViewStyle = {
    position: 'absolute',
    justifyContent: 'flex-end',
    marginHorizontal: 5,
    paddingTop: 5,
  };

  const placeholderContainerAnimatedStyle = useAnimatedStyle(
    () => ({
      top: minimized.value === 1 ? 0 : 15,
    }),
    [value],
  );

  const borderAnimationStyle = useAnimatedStyle(() => {
    return {
      borderColor: border.value,
    };
  });

  const placeholderTextStyle = {
    color: BaseColor.DARK_GRAY,
  };

  const placeholderTextAnimatedStyle = useAnimatedStyle(
    () => ({
      fontSize: interpolate(minimized.value, [0, 1], [12, 8]),
    }),
    [active, value],
  );

  return (
    <Pressable onPress={focusTextInput} style={{ marginBottom }}>
      <Animated.View style={[styles.container, borderAnimationStyle]}>
        <Animated.View
          style={[placeholderContainerStyle, placeholderContainerAnimatedStyle]}
        >
          <Animated.Text
            style={[placeholderTextStyle, placeholderTextAnimatedStyle]}
            numberOfLines={1}
          >
            <Text>{placeholder}</Text>
          </Animated.Text>
        </Animated.View>
        <RNTextInput
          {...rest}
          ref={textInputRef}
          value={value}
          editable={!disabled}
          style={styles.textInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          disableFullscreenUI
          enablesReturnKeyAutomatically
          keyboardAppearance={colorScheme}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    marginTop: 10,
  },
  container: {
    borderWidth: 2,
    width: '100%',
    backgroundColor: BaseColor.LIGHT_YELLOW,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default TextInput;
