import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  return (
    <SafeAreaView>
      <Text children={'Splash Screen'} />
    </SafeAreaView>
  );
};

export default SplashScreen;
