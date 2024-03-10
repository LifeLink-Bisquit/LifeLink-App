import React from 'react';
import Root from './src/navigation/Root';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = (): React.JSX.Element => {
  //TODO: dark mode and theme provider
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
