import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {resetPassword} from '../../../../services/api/auth/resetPassword';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const {goBack} = useNavigation();

  const handlePasswordChange = () => {
    resetPassword({newPassword, oldPassword}).then(() => {
      goBack();
    });
  };

  return (
    <Screen
      containerStyle={{
        justifyContent: 'flex-start',
        gap: 10,
        alignItems: 'flex-start',
      }}>
      <Spacer height={10} />
      <Text>{'passwordChangeInfo'}</Text>
      <Spacer height={30} />
      <Input
        placeholder="oldPassword"
        value={oldPassword}
        isPassword
        onChangeText={text => setOldPassword(text)}
      />
      <Input
        placeholder="newPassword"
        value={newPassword}
        isPassword
        onChangeText={text => setNewPassword(text)}
      />
      <Button label="changePassword" onPress={handlePasswordChange} />
    </Screen>
  );
};

export default ChangePassword;
