import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getActiveOperation} from '../../../../services/api/evacOperation/getActiveOperation';
import {ActiveOperationResponse} from '../../../../services/api/types/app.types';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import AttachIcon from '../../../../../assets/svgs/attach.svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Spacer from '../../../components/Spacer/Spacer';
import {Colors} from '../../../../constants/colors';

const LandingScreen: React.FC = () => {
  const {navigate, goBack} = useNavigation();

  useFocusEffect(() => {
    getActiveOperation(
      data => {
        console.log('data', data);
        navigate('EvacProcessScreen', {data});
      },
      () => {
        navigate('MapScreen');
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
