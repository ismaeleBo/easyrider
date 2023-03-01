import { BaseColor } from 'easyrider/src/assets/palette/palette';
import { FontSize, FontWeight } from 'easyrider/src/assets/typgraphy';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import AnimatedTextColor from '../AnimatedTextColor';
import { SvgXml } from 'react-native-svg';
import eye from '../../assets/icons/eye.svg';
import eyeClose from '../../assets/icons/eye-close.svg';

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
  title?: string;
  placeholder?: string;
  errorMessage?: string;
  hint?: string;
  iconName?: string;
  iconSize?: number;
  disabled?: boolean;
  iconDisabled?: boolean;
  password?: boolean;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (text: string) => void;
  onPressIcon?: () => void;
  showMaxLengthHint?: boolean;
  marginBottom?: number;
}

const TextInput = ({
  autoFocus,
  value = '',
  placeholder = '',
  title = '',
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
  password = false,
  ...rest
}: TextInputProps) => {
  const textInputRef = useRef<RNTextInput>(null);

  const [touched, setTouched] = useState(false);
  const [hidePassword, setHidePassword] = useState(password);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setTouched(true);
    onBlur(event);
  };

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    onFocus(event);
  };

  const handleChangeText = (value: string) => {
    onChangeText(value);
  };

  const focusTextInput = useCallback(() => textInputRef.current?.focus(), []);

  const styles = StyleSheet.create({
    textInput: {
      width: '100%',
      paddingVertical: 15,
    },
    container: {
      borderWidth: 1,
      width: '100%',
      borderColor:
        touched && errorMessage ? BaseColor.RED : BaseColor.LIGHT_YELLOW,
      backgroundColor: BaseColor.LIGHT_YELLOW,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginTop: 10,
    },
  });

  const handleShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Pressable onPress={focusTextInput} style={{ marginBottom }}>
      <View className='flex-row justify-between items-center'>
        <AnimatedTextColor
          fontWeight={FontWeight.MEDIUM}
          fontSize={FontSize.MEDIUM}
        >
          {title}
        </AnimatedTextColor>
        {password && (
          <TouchableOpacity onPress={handleShowPassword}>
            <SvgXml
              xml={hidePassword ? eye : eyeClose}
              width={32}
              height={32}
              fill={isDark ? BaseColor.WHITE : ''}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        <RNTextInput
          {...rest}
          ref={textInputRef}
          value={value}
          editable={!disabled}
          style={styles.textInput}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleChangeText}
          disableFullscreenUI
          enablesReturnKeyAutomatically
          keyboardAppearance={colorScheme}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          secureTextEntry={hidePassword}
        />
      </View>
      {errorMessage && touched && (
        <Text className='text-red-500 text-14 font-medium mt-8'>
          {errorMessage}
        </Text>
      )}
    </Pressable>
  );
};

export default TextInput;
