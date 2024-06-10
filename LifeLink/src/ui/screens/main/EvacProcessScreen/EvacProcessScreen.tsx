import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import PauseIcon from '../../../../../assets/svgs/pause.svg';
import PlayIcon from '../../../../../assets/svgs/play.svg';
import {Colors} from '../../../../constants/colors';
import Button from '../../../components/Button/Button';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getSecondsSinceCreateTime} from '../../../../constants/app.utils';
import ToggleButton from '../../../components/ToggleButton/ToggleButton';
import {pauseEvacOperation} from '../../../../services/api/evacOperation/pauseEvac';
import {completeEvac} from '../../../../services/api/evacOperation/completeEvac';
import {
  EvacPerson,
  EvacPersonStatus,
  getStatusIdByValue,
} from '../../../../services/api/types/app.types';
import {getEvacPerson} from '../../../../services/api/evacPerson/getEvacPerson';
import {EMERGENCY_PHONE_NUMBER} from '../../../../services/api/constants';

interface TimerProps {}

const EvacProcessScreen: React.FC<TimerProps> = () => {
  const {goBack} = useNavigation();
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const {params} = useRoute();
  const [evacPerson, setEvacPerson] = useState<EvacPerson>();

  useEffect(() => {
    getEvacPerson(params.data.evacPersonId, data => {
      setEvacPerson(data);
    });
  }, [params.data.evacPersonId]);

  useEffect(() => {
    const initialSeconds = getSecondsSinceCreateTime(params?.data.createTime);
    setElapsedSeconds(initialSeconds);

    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedSeconds(prevSeconds => prevSeconds + 1);
      }, 1000); // Update timer every second
    }
    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [isRunning, params?.data.createTime]);

  const handleCompleteEvacuation = () => {
    completeEvac(params.data.evacPersonId, EvacPersonStatus.Safe, goBack);
  };

  const handleCallHelp = () => {
    Linking.openURL(`tel:${EMERGENCY_PHONE_NUMBER}`);
  };

  const days = Math.floor(elapsedSeconds / (3600 * 24));
  const hours = Math.floor((elapsedSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const formattedTime: string = `${days.toString().padStart(2, '0')}:${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  const toggleTimer = () => {
    console.log(params.data.evacPersonId);
    pauseEvacOperation(params.data.evacPersonId, () => {
      setIsRunning(prevState => !prevState);
    });
  };

  return (
    <Screen
      containerStyle={{
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <EvacueeInfo evacPerson={evacPerson} />
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerText} fontSize="xLarge">
            {formattedTime}
          </Text>
        </View>
      </View>
      <ToggleButton isRunning={isRunning} onPress={toggleTimer} />
      <View style={{flexDirection: 'row', gap: 10}}>
        <Button label="completeEvacuation" onPress={handleCompleteEvacuation} />
        <Button label="callHelp" onPress={handleCallHelp} />
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

export default EvacProcessScreen;
