import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './src/navigation/Root';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = (): React.JSX.Element => {
  //TODO: dark mode and theme provider
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Root />
          </NavigationContainer>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
