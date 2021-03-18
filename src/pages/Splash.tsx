import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useActions } from '../hooks/use-actions';
import styles from './Splash.styles';

const Splash: React.FC = () => {
  const { loadUser } = useActions();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Movie Matcher</Text>
    </View>
  );
};

export default Splash;
