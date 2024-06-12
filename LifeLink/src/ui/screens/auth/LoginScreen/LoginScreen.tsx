import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pressCount, setPressCount] = useState(0);
  const lastPressTime = useRef<number | null>(null);

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

  const handleImagePress = () => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;
    if (
      pressCount === 0 ||
      now - (lastPressTime.current ?? 0) > DOUBLE_PRESS_DELAY
    ) {
      setPressCount(1);
    } else {
      setPressCount(pressCount + 1);
    }
    lastPressTime.current = now;

    if (pressCount === 3) {
      Alert.alert('Well Done', 'Hey you! Bisquit lover!');
      setPressCount(0);
    }
  };

  return (
    <Screen containerStyle={styles.screen} useKeyboardAvoidingView={true}>
      <TouchableOpacity onPress={changeLanguage} style={styles.languageButton}>
        <Text children={currentLanguage} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 10}}>
        <Text children={'login'} fontSize="xLarge" />
        <Text children={'loginInfo'} textAlign="center" fontSize="large" />
      </View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={require('../../../../../assets/pngs/logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
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
