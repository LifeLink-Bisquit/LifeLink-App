import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIcon from '../../../assets/svgs/back.svg';
import {Colors} from '../../constants/colors';
import Text from '../../ui/components/Text/Text';

import styles from './styles';

import AboutUs from '../../ui/screens/main/AboutUs/AboutUs';
import ChangePassword from '../../ui/screens/main/ChangePassword/ChangePassword';
import EvacHistory from '../../ui/screens/main/EvacuationHistory/EvacHistory';
import ProfileScreen from '../../ui/screens/main/ProfileScreen';
import {OperatorScreens, OperatorStackParamList} from '../routes';

const Stack = createNativeStackNavigator<OperatorStackParamList>();

const OperatorStack = () => {
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();

  const getHeader = (
    navigation: NativeStackNavigationProp<OperatorStackParamList>,
    title: string,
    isBackButtonVisible: boolean = false,
    rightElement?: ReactNode,
    onPress?: () => void,
  ) => {
    return (
      <View style={styles(top).header}>
        {isBackButtonVisible && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color={Colors.white} />
          </TouchableOpacity>
        )}
        <Text fontSize="xLarge" style={{color: Colors.white}}>
          {title}
        </Text>
        <TouchableOpacity onPress={onPress} style={styles(top).rightElement}>
          {rightElement}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={OperatorScreens.Profile}
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name={OperatorScreens.Profile}
        component={ProfileScreen}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('profile')),
        })}
      />

      <Stack.Screen
        name={OperatorScreens.EvacuationHistory}
        component={EvacHistory}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('evacuationHistory'), true),
        })}
      />

      <Stack.Screen
        name={OperatorScreens.ChangePassword}
        component={ChangePassword}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('changePassword'), true),
        })}
      />

      <Stack.Screen
        name={OperatorScreens.AboutUs}
        component={AboutUs}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('aboutUs'), true),
        })}
      />
    </Stack.Navigator>
  );
};

export default OperatorStack;
