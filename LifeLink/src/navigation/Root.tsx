import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {getUser} from '../constants/app.utils';
import {PERSON_ROLE} from '../services/api/constants';
import SplashScreen from '../ui/screens/SplashScreen';
import useGeneralStore from '../zustand/generalStore';
import AuthNavigator from './auth/AuthNavigator';
import MainNavigator from './main/MainNavigator';
import UserNavigator from './main/UserNavigator';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from './routes';

const Root = () => {
  const RootStack = createNativeStackNavigator();
  const [splashVisibility, setSplashVisibility] = useState<boolean>(true);
  const isLoggedIn = useGeneralStore(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisibility(false);
    }, 2000);
  }, []);

  const getNavigatorByRole = () => {
    if (getUser().role === PERSON_ROLE) {
      return (
        <RootStack.Screen name={HOME_NAVIGATOR} component={UserNavigator} />
      );
    }
    return <RootStack.Screen name={HOME_NAVIGATOR} component={MainNavigator} />;
  };

  return splashVisibility ? (
    <SplashScreen />
  ) : (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        getNavigatorByRole()
      ) : (
        <RootStack.Screen name={AUTH_NAVIGATOR} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default Root;
