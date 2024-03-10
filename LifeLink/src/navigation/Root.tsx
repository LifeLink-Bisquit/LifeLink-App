import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import useGeneralStore from '../store/generalStore';
import SplashScreen from '../ui/screens/SplashScreen';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from './routes';
import AuthNavigator from './auth/AuthNavigator';
import MainNavigator from './main/MainNavigator';

const Root = () => {
  const RootStack = createNativeStackNavigator();
  const [splashVisibility, setSplashVisibility] = useState<boolean>(true);

  const isLoggedIn = useGeneralStore(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisibility(false);
    }, 2000);
  }, []);

  return splashVisibility ? (
    <SplashScreen />
  ) : (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <RootStack.Screen name={HOME_NAVIGATOR} component={MainNavigator} />
      ) : (
        <RootStack.Screen name={AUTH_NAVIGATOR} component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default Root;
