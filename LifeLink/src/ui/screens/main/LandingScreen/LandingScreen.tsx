import React, {useState, useRef} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getActiveOperation} from '../../../../services/api/evacOperation/getActiveOperation';
import {ActiveOperationResponse} from '../../../../services/api/types/app.types';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import AttachIcon from '../../../../../assets/svgs/attach.svg';
import {
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

const LandingScreen: React.FC = () => {
  const {dispatch} = useNavigation();
  const [isNavigating, setIsNavigating] = useState(false);
  const isNavigatingRef = useRef(isNavigating);

  const handleNavigation = (routeName, params) => {
    if (!isNavigatingRef.current) {
      setIsNavigating(true);
      isNavigatingRef.current = true;
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: routeName, params}],
        }),
      );
    }
  };

  useFocusEffect(() => {
    getActiveOperation(
      data => {
        handleNavigation('EvacProcessScreen', {
          evacPersonId: data.evacPersonId,
        });
      },
      () => {
        handleNavigation('MapScreen', {});
      },
    );
  });

  return (
    <Screen>
      <AttachIcon />
      <Text fontSize="xxLarge">{'waitForDataFetch'}</Text>
    </Screen>
  );
};

export default LandingScreen;
