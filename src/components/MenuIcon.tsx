import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import styles from './MenuIcon.styles';

interface MenuIconProps {
  source: ImageSourcePropType;
}

const Button: React.FC<MenuIconProps> = ({ source }) => {
  return <Image source={source} style={styles.image} />;
};

export default Button;
