import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import EvacProcessScreen from '../../ui/screens/main/EvacProcessScreen/EvacProcessScreen';
import MapScreen from '../../ui/screens/main/MapScreen';
import LandingScreen from '../../ui/screens/main/LandingScreen/LandingScreen';
import {MainScreens, MainStackParamList} from '../routes';

const Stack = createNativeStackNavigator<MainStackParamList>();
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainScreens.Landing}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={MainScreens.Landing} component={LandingScreen} />
      <Stack.Screen name={MainScreens.Map} component={MapScreen} />
      <Stack.Screen
        name={MainScreens.EvacProcess}
        component={EvacProcessScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
