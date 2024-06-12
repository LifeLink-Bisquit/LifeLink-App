import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  OperatorScreens,
  OperatorStackParamList,
} from '../../../../navigation/routes';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';

const EvacHistory: React.FC = () => {
  const {params} =
    useRoute<
      RouteProp<OperatorStackParamList, OperatorScreens.EvacuationHistory>
    >();
  const items = params?.items;

  console.log(items);

  const {t} = useTranslation();

  const calculateDuration = (startTime: string, endTime: string): string => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const duration = end.getTime() - start.getTime();
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    let durationString = '';
    if (days > 0) {
      durationString += `${days} ${t('days')}, `;
    }
    if (hours > 0) {
      durationString += `${hours} ${t('hours')}, `;
    }
    durationString += `${minutes} ${t('minutes')}`;
    return durationString;
  };

  return (
    <Screen containerStyle={styles.container} useScrollView useSafeArea={false}>
      {items.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <View>
            <Text fontSize="large">{'operationDuration'}</Text>
            <Text>{calculateDuration(item.createTime, item.modifyTime)}</Text>
          </View>
          <Spacer height={10} />
          <Text>{'details'}</Text>
          <Spacer height={10} />
          {item.evacPerson && <EvacueeInfo evacPerson={item.evacPerson} />}
          <View style={styles.separator} />
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    marginBottom: 10,
    width: '100%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  evacPersonContainer: {
    marginTop: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default EvacHistory;
