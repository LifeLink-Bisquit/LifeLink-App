import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthScreens, AuthStackParamList} from '../routes';
import LoginScreen from '../../ui/screens/auth/LoginScreen';
import RegisterScreen from '../../ui/screens/auth/Register/RegisterScreen';
import {View} from 'react-native';
import Text from '../../ui/components/Text/Text';
import styles from '../main/styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../../../assets/svgs/back.svg';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();
  const getHeader = (title: string) => {
    return (
      <View style={styles(top).header}>
        <TouchableOpacity onPress={goBack}>
          <BackIcon color={Colors.white} />
        </TouchableOpacity>
        <Text fontSize="xLarge" style={{color: Colors.white}}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: () => getHeader(t('register')),
      }}
      initialRouteName={AuthScreens.Login}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
