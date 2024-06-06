import React from 'react';
import {TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import Text from '../Text/Text';
import {TouchableOpacityProps} from 'react-native-gesture-handler';
import {Colors} from '../../../constants/colors';

interface ButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  label: string;
  props?: TouchableOpacityProps;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  isLoading,
  fullWidth,
  props,
}) => {
  return (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.button, {width: fullWidth ? '100%' : 'auto'}]}
      onPress={isLoading ? undefined : onPress}
      {...props}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    maxHeight: 50,
    minHeight: 50,
    minWidth: 100,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
