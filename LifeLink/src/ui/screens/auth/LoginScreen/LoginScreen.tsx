import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  Languages,
  switchLanguage,
} from '../../../../constants/translations.utils';
import {login} from '../../../../services/api/auth/postLogin';
import {useLocalizationStore} from '../../../../zustand/translationStore';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import {styles} from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  //const setLogin = useGeneralStore().setLoginState;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({email, password});
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const {language} = useLocalizationStore();
  const [currentLanguage, setCurrentLanguage] = useState(
    language.toUpperCase(),
  );

  const changeLanguage = () => {
    if (currentLanguage === 'EN') {
      switchLanguage(Languages.TR);
      setCurrentLanguage('TR');
    } else {
      switchLanguage(Languages.EN);
      setCurrentLanguage('EN');
    }
  };

  return (
    <Screen containerStyle={styles.screen} useKeyboardAvoidingView={true}>
      <TouchableOpacity onPress={changeLanguage} style={styles.languageButton}>
        <Text children={currentLanguage} />
      </TouchableOpacity>
      <Text children={'login'} fontSize="xLarge" />
      <Image
        source={require('../../../../../assets/pngs/logo.png')}
        style={styles.logo}
      />
      <View style={styles.input}>
        <Input value={email} onChangeText={setEmail} placeholder="email" />
        <Input
          isPassword={true}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
        />
      </View>
      <View>
        <Button label="login" onPress={handleLogin} />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text>{'toRegister'}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default LoginScreen;
