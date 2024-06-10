import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PauseIcon from '../../../../assets/svgs/pause.svg';
import PlayIcon from '../../../../assets/svgs/play.svg';
import {Colors} from '../../../constants/colors';

interface ToggleButtonProps {
  isRunning: boolean;
  onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({isRunning, onPress}) => {
  return (
    <TouchableOpacity style={styles.toggleButton} onPress={onPress}>
      {isRunning ? (
        <PauseIcon width={30} height={30} fill={Colors.white} />
      ) : (
        <PlayIcon width={30} height={30} fill={Colors.white} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ToggleButton;
