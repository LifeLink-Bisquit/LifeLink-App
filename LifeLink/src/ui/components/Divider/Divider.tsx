import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/colors';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    width: '100%',
  },
});

export default Divider;
