import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PauseIcon from '../../../../../assets/svgs/pause.svg';
import PlayIcon from '../../../../../assets/svgs/play.svg';
import {Colors} from '../../../../constants/colors';
import Button from '../../../components/Button/Button';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';

interface TimerProps {}

const TimerScreen: React.FC<TimerProps> = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleCompleteEvacutaion = () => {};

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => (prevSeconds + 1) % 60);
        if (seconds === 59) {
          setMinutes(prevMinutes => (prevMinutes + 1) % 60);
          if (minutes === 59) {
            setHours(prevHours => prevHours + 1);
          }
        }
      }, 1000); // Update timer every second
    }
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [isRunning, minutes, seconds]);

  const formattedTime: string = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const toggleTimer = () => {
    setIsRunning(prevState => !prevState);
  };

  return (
    <Screen
      containerStyle={{justifyContent: 'space-between', marginBottom: 20}}>
      <EvacueeInfo
        age={42}
        imageUrl="https://fastly.picsum.photos/id/281/300/300.jpg?hmac=M1ECxENtZTA9gbkNhZXKZASKpDH3VcYjpr3HmLFwwrk"
        location="Beyoglu, Istanbul"
        medicineInfo='{"medicine": "Aspirin", "dose": "2"}'
        name="Ahmet Yilmaz"
      />
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText} fontSize="xLarge">
            {formattedTime}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTimer}>
        {isRunning ? (
          <PauseIcon width={30} height={30} fill={Colors.white} />
        ) : (
          <PlayIcon width={30} height={30} fill={Colors.white} />
        )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Button label="completeEvacuation" onPress={handleCompleteEvacutaion} />
        <Button label="callHelp" onPress={() => {}} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
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

export default TimerScreen;
