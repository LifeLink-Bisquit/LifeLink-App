import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {Colors} from '../../../constants/colors';

interface LoadingScreenProps {
  loading: boolean;
}

const Loading: React.FC<LoadingScreenProps> = ({loading}) => {
  if (loading) {
    return (
      <Modal animationType="fade" transparent={true}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
      </Modal>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 999,
  },
});

export default Loading;
