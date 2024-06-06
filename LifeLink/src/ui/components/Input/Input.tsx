import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from '../../../constants/colors';
import {EyeClose, EyeOpen} from '../../../../assets/svgs';
import {useTranslation} from 'react-i18next';
import Text from '../Text/Text';

interface InputProps extends TextInputProps {
  isPassword?: boolean;
  prefixText?: string;
}

const Input: React.FC<InputProps> = props => {
  const {placeholder, isPassword, prefixText, ...otherProps} = props;
  const {t} = useTranslation();

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(!!isPassword); // Manage secureTextEntry state

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(prev => !prev);
  };

  // Determine input type based on isPassword prop
  const inputType: TextInputProps['keyboardType'] = isPassword
    ? secureTextEntry
      ? otherProps.keyboardType
      : 'visible-password'
    : otherProps.keyboardType;

  return (
    <View style={[styles.inputContainer]}>
      {prefixText && <Text>{prefixText}</Text>}
      <TextInput
        style={styles.input}
        placeholder={t(placeholder ?? '')}
        placeholderTextColor={Colors.black}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        {...otherProps}
        keyboardType={inputType}
        onChangeText={props.onChangeText}
        value={props.value}
      />
      {isPassword && ( // Conditionally render the toggle button if isPassword is true
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleSecureTextEntry}
          activeOpacity={0.8}>
          {secureTextEntry ? <EyeOpen /> : <EyeClose />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 5,
    fontFamily: 'TiltNeon-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    width: '100%',
    borderRadius: 6,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
  toggleButton: {},
});

export default Input;
