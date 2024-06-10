import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  getEvacPersonIllnessStatusById,
  getEvacPersonMedicationStatusById,
  getEvacPersonProsthesisStatusById,
  getEvacPersonSpecialNeedsStatusById,
} from '../../../services/api/constants';
import {Colors} from '../../../constants/colors';
import Text from '../Text/Text';

type Variant = 'medic' | 'illness' | 'special_needs' | 'prosthesis';

interface ParameterListProps {
  data: string[];
  variant: Variant;
}

const ParameterList: React.FC<ParameterListProps> = ({data, variant}) => {
  return (
    data.length > 0 && (
      <View style={styles.container}>
        <Text>{variant}</Text>
        {data.map(id => (
          <View key={id} style={styles.item}>
            {variant === 'medic' && (
              <Text>{getEvacPersonMedicationStatusById(id)}</Text>
            )}
            {variant === 'illness' && (
              <Text>{getEvacPersonIllnessStatusById(id)}</Text>
            )}
            {variant === 'special_needs' && (
              <Text>{getEvacPersonSpecialNeedsStatusById(id)}</Text>
            )}
            {variant === 'prosthesis' && (
              <Text>{getEvacPersonProsthesisStatusById(id)}</Text>
            )}
          </View>
        ))}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  item: {
    marginVertical: 3,
    backgroundColor: Colors.darkGray,
    padding: 10,
    borderRadius: 16,
  },
});

export default ParameterList;
