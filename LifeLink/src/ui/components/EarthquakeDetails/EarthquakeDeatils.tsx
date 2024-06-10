import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getLast5EarthQuakes} from '../../../services/kandilli_api/getLast5';
import {Earthquake} from '../../../services/kandilli_api/types';
import Text from '../Text/Text';

const EarthquakeDetails: React.FC = () => {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  useEffect(() => {
    getLast5EarthQuakes(data => {
      setEarthquakes(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {earthquakes.map(earthquake => (
        <View key={earthquake._id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>{'time'}</Text>
            <Text style={styles.value}>{earthquake.date_time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'location'}</Text>
            <Text style={styles.value}>{earthquake.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'depth'}</Text>
            <Text style={styles.value}>{earthquake.depth}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{'magnitude'}</Text>
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
    backgroundColor: '#fff',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});

export default EarthquakeDetails;
