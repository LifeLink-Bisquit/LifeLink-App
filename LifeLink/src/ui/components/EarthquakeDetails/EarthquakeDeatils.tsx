import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Earthquake} from '../../../services/kandilli_api/types';
import Text from '../Text/Text';
import {Colors} from '../../../constants/colors';

interface EarthquakeDeatilsProps {
  earthquakes: Earthquake[];
}

const EarthquakeDetails: React.FC<EarthquakeDeatilsProps> = ({earthquakes}) => {
  return (
    <View style={styles.container}>
      {earthquakes.map(earthquake => (
        <View key={earthquake._id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label} fontSize="large">
              {'time'}
            </Text>
            <Text style={styles.value}>{earthquake.date_time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} fontSize="large">
              {'location'}
            </Text>
            <Text style={styles.value}>{earthquake.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} fontSize="large">
              {'depth'}
            </Text>
            <Text style={styles.value}>{earthquake.depth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label} fontSize="large">
              {'magnitude'}
            </Text>
            <Text style={styles.value}>{earthquake.mag}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: Colors.primary,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  label: {
    marginRight: 10,
    color: Colors.white,
  },
  value: {
    color: Colors.white,
  },
});

export default EarthquakeDetails;
