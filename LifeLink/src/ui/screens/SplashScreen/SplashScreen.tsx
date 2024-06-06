import React, {useEffect} from 'react';
import LogoIcon from '../../../../assets/svgs/logo.svg';
import {Colors} from '../../../constants/colors';
import {getIllness} from '../../../services/api/parameter/getIlness';
import {getMedication} from '../../../services/api/parameter/getMedications';
import Screen from '../../components/Screen/Screen';
import Text from '../../components/Text/Text';
import {styles} from './styles';

const SplashScreen = () => {
  useEffect(() => {
    getIllness();
    getMedication();
  }, []);
  return (
    <Screen useSafeArea={false} containerStyle={styles.splash}>
      <LogoIcon width={150} height={150} />
      <Text
        children={'Life Link'}
        fontSize="xxLarge"
        style={{color: Colors.white}}
      />
      <Text
        children={'"stay linked"'}
        fontSize="medium"
        style={{color: Colors.white}}
      />
    </Screen>
  );
};

export default SplashScreen;
