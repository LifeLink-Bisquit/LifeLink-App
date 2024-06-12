import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import useGeneralStore from '../../../zustand/generalStore';
import Loading from '../Loading';
import Toast from 'react-native-toast-message';

interface ScreenProps {
  children: ReactNode;
  useSafeArea?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  useKeyboardAvoidingView?: boolean;
  useScrollView?: boolean;
  onRefresh?: () => void;
}

const Screen = ({
  children,
  useSafeArea = true,
  useKeyboardAvoidingView = false,
  useScrollView = false,
  containerStyle,
  onRefresh,
}: ScreenProps) => {
  const isLoading = useGeneralStore(state => state.loading);

  if (useSafeArea) {
    return (
      <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView
          enabled={useKeyboardAvoidingView}
          behavior="padding"
          style={[styles.children, containerStyle]}>
          {children}
        </KeyboardAvoidingView>
        {isLoading && <Loading loading={isLoading} />}
        <Toast />
      </SafeAreaView>
    );
  } else if (useScrollView) {
    return (
      <ScrollView
        style={[styles.container]}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          ) : undefined
        }>
        <KeyboardAvoidingView
          enabled={useKeyboardAvoidingView}
          behavior="padding"
          style={[styles.children, containerStyle]}>
          {children}
        </KeyboardAvoidingView>
        {isLoading && <Loading loading={isLoading} />}
        <Toast />
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.container]}>
        <View style={[styles.children, containerStyle]}>{children}</View>
        {isLoading && <Loading loading={isLoading} />}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  children: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
});

export default Screen;
