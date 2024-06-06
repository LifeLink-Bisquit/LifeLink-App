import React from 'react';
import {StyleSheet} from 'react-native';
import Divider from '../Divider/Divider';
import Text from '../Text/Text';

interface SubHeaderProps {
  value: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({value}) => {
  return (
    <>
      <Text style={styles.subHeader}>{value}</Text>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    alignSelf: 'flex-start',
  },
});

export default SubHeader;
