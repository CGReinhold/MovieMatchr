import React, { useState } from 'react';
import { Button, Image, TextInput, View, Text } from 'react-native';
import styles from './UserInfo.styles';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useActions } from '../hooks/use-actions';

const UserInfo: React.FC = () => {
  const userID = useTypedSelector(({ user }) => user.userID);

  const [partnerID, setPartnerID] = useState('');
  const { addUserToSync } = useActions();

  const handleMatchPress = () => {
    addUserToSync(partnerID);
    setPartnerID('');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../images/user.png')} />
      <Text style={styles.title}>This is your Code</Text>
      <Text style={styles.code}>{userID}</Text>
      <Text style={styles.friendTitle}>Sync with a friend</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your friend code here"
          onChangeText={setPartnerID}
          value={partnerID}
        />
      </View>
      <Button title="Sync!" onPress={handleMatchPress} />
    </View>
  );
};

export default UserInfo;
