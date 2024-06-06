import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../ui/screens/main/HomeScreen';
import ProfileScreen from '../../ui/screens/main/ProfileScreen';
import {RootStackParamList} from '../routes';
import HomeStack from './HomeStackNavigator';
import {Colors} from '../../constants/colors';
import {useTranslation} from 'react-i18next';
import HomeLogo from '../../../assets/svgs/home.svg';
import ProfileLogo from '../../../assets/svgs/profile.svg';
import AttachLogo from '../../../assets/svgs/attach.svg';
import {View} from 'react-native';
import Text from '../../ui/components/Text/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';

const MainNavigator = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();

  const getIcon = (
    {focused, color}: {focused: boolean; color: string},
    name: string,
  ) => {
    switch (name) {
      case 'home':
        return <HomeLogo color={focused ? color : Colors.white} />;
      case 'map':
        return <AttachLogo color={focused ? color : Colors.white} />;
      case 'profile':
        return <ProfileLogo color={focused ? color : Colors.white} />;
      default:
        return <HomeLogo />;
    }
  };

  const getHeader = (title: string) => {
    return (
      <View style={styles(top).header}>
        <Text fontSize="xLarge" style={{color: Colors.white}}>
          {title}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: Colors.primary,
          borderTopWidth: 0,
          borderRadius: 16,
        },
        tabBarActiveTintColor: Colors.secondary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => getHeader(t('home')),
          tabBarLabel: t('home'),
          tabBarIcon: ({focused, color}) => getIcon({focused, color}, 'home'),
        }}
      />
      <Tab.Screen
        name="Map"
        component={HomeStack}
        options={{
          tabBarLabel: t('map'),
          tabBarIcon: ({focused, color}) => getIcon({focused, color}, 'map'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          headerShown: true,
          header: () => getHeader(t('profile')),
          tabBarIcon: ({focused, color}) =>
            getIcon({focused, color}, 'profile'),
        }}
      />
    </Tab.Navigator>
  );
};
export default MainNavigator;
