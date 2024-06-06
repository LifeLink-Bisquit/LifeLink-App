import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import EvacProcessScreen from '../../ui/screens/main/EvacProcessScreen/EvacProcessScreen';
import MapScreen from '../../ui/screens/main/MapScreen';
import LandingScreen from '../../ui/screens/main/LandingScreen/LandingScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'LandingScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="EvacProcessScreen" component={EvacProcessScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
