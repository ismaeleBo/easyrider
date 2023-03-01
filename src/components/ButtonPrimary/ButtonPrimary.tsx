import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  customWrapper?: string;
  customText?: string;
}

const ButtonPrimary = ({
  title,
  onPress,
  disabled = false,
  customWrapper = 'bg-white',
  customText = 'text-black',
}: ButtonPrimaryProps): JSX.Element => {
  const buttonStyle = 'flex-row width-auto rounded-lg py-15 px-20 '.concat(
    customWrapper,
  );
  const textStyle =
    'text-22 uppercase text-center w-full font-bold font-body '.concat(
      customText,
    );
  return (
    <TouchableOpacity
      onPress={onPress}
      className={buttonStyle}
      style={{ opacity: disabled ? 0.4 : 1 }}
      disabled={disabled}
    >
      <Text className={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
