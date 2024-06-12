import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BackIcon from '../../../assets/svgs/back.svg';
import PlusIcon from '../../../assets/svgs/plus.svg';
import {Colors} from '../../constants/colors';
import Text from '../../ui/components/Text/Text';
import UserProfileScreen from '../../ui/screens/user/UserProfileScreen/UserProfileScreen';
import UsersPeopleScreen from '../../ui/screens/user/UsersPeopleScreen';
import {UserProfileScreens, UserProfileStackParamList} from '../routes';
import styles from './styles';
import EvacPersonAddScreen from '../../ui/screens/user/EvacPersonAddScreen/EvacPersonAddScreen';
import ChangePassword from '../../ui/screens/main/ChangePassword/ChangePassword';
import AboutUs from '../../ui/screens/main/AboutUs/AboutUs';
import EvacPersonEditScreen from '../../ui/screens/user/EvacPersonEdit/EvacPersonEdit';

const Stack = createNativeStackNavigator<UserProfileStackParamList>();

const UserStack = () => {
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();

  const getHeader = (
    navigation: NativeStackNavigationProp<UserProfileStackParamList>,
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
      initialRouteName={UserProfileScreens.UserProfile}
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name={UserProfileScreens.UserProfile}
        component={UserProfileScreen}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('profile')),
        })}
      />
      <Stack.Screen
        name={UserProfileScreens.UsersPeople}
        component={UsersPeopleScreen}
        options={({navigation}) => ({
          header: () =>
            getHeader(
              navigation,
              t('usersPeople'),
              true,
              <PlusIcon color={Colors.white} />,
              () => {
                navigation.navigate('EvacPersonAdd');
              },
            ),
        })}
      />

      <Stack.Screen
        name={UserProfileScreens.EvacPersonAdd}
        component={EvacPersonAddScreen}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('evacPersonAdd'), true),
        })}
      />
      <Stack.Screen
        name={UserProfileScreens.EvacPersonEdit}
        component={EvacPersonEditScreen}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('evacPersonEdit'), true),
        })}
      />
      <Stack.Screen
        name={UserProfileScreens.ChangePassword}
        component={ChangePassword}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('changePassword'), true),
        })}
      />
      <Stack.Screen
        name={UserProfileScreens.AboutUs}
        component={AboutUs}
        options={({navigation}) => ({
          header: () => getHeader(navigation, t('aboutUs'), true),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
