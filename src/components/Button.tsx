import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styles from './Button.style';

interface ButtonProps {
  onPress(): void;
  size: number;
}

const Button: React.FC<ButtonProps> = ({ onPress, size, children }) => {
  const sizeStyles = { height: size, width: size, borderRadius: size / 2 };
  return (
    <TouchableWithoutFeedback style={styles.touchable} onPress={onPress}>
      <View style={[sizeStyles, styles.container]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
