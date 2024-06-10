import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface AvatarProps {
  text: string;
  size?: number;
  backgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  text,
  size = 50,
  backgroundColor = '#ccc',
}) => {
  const initials = text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return (
    <View
      style={[styles.container, {width: size, height: size, backgroundColor}]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 40,
  },
});

export default Avatar;
