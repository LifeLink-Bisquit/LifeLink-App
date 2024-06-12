import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import AttachIcon from '../../../../../assets/svgs/attach.svg';
import {Colors} from '../../../../constants/colors';
import {useMainNavigation} from '../../../../hooks/useMainNavigation';
import {MainScreens} from '../../../../navigation/routes';
import {getActiveOperation} from '../../../../services/api/evacOperation/getActiveOperation';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';

const LandingScreen: React.FC = () => {
  const {navigate} = useMainNavigation<MainScreens.Map>();

  useFocusEffect(() => {
    getActiveOperation(
      data => {
        console.log('data', data);
        navigate(MainScreens.EvacProcess, {data});
      },
      () => {
        navigate(MainScreens.Map);
      },
    );
  });

  return (
    <Screen>
      <AttachIcon width={80} height={80} color={Colors.secondary} />
      <Spacer height={20} />
      <Text fontSize="xxLarge" textAlign="center">
        {'waitForDataFetch'}
      </Text>
    </Screen>
  );
};

export default LandingScreen;
