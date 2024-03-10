import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthScreens, AuthStackParamList} from '../routes';
import LoginScreen from '../../ui/screens/LoginScreen';

const AuthNavigator = () => {
  //TODO: Fix the type of the stack
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator initialRouteName={AuthScreens.Login}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
