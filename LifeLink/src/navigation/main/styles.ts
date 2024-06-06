import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const styles = (top: number) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: 16,
      paddingBottom: 8,
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    rightElement: {marginLeft: 'auto', marginRight: 20},
  });

export default styles;
