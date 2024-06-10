import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import Spacer from '../../../components/Spacer/Spacer';

const AboutUs: React.FC = () => {
  return (
    <Screen containerStyle={styles.container} useSafeArea={false} useScrollView>
      <Image
        source={require('../../../../../assets/pngs/logo.png')}
        style={styles.image}
      />

      <Text>
        {
          'Bisquit is a company that provides services to people who need help. We are here to help you. On the other side Life Link has been developed for making evacuation process easier. \n\nDevelopers: \n\nBerkay Baygut\nMobile Developer\n\nMert Gurer\nBackend Developer\n\n'
        }
      </Text>

      <Image
        source={require('../../../../../assets/pngs/company.png')}
        style={styles.image}
      />
      <Text>{'All rights reserved. © 2024'}</Text>
      <Spacer height={32} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: '100%',

    height: 300,

    resizeMode: 'contain',
    alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 32,
  },
});

export default AboutUs;
