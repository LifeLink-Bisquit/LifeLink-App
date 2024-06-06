import React, {useState, useEffect} from 'react';
import {View, Button, Modal, StyleSheet} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location';
import Input from '../../../components/Input/Input';
import Text from '../../../components/Text/Text';
import {getIllness} from '../../../../services/api/parameter/getIlness';
import {getMedication} from '../../../../services/api/parameter/getMedications';
import PickerSheet from '../../../components/PickerSheet/PickerSheet';
import useParameterStore from '../../../../services/api/parameter/store';

type Props = {};

const HomeScreen: React.FC<Props> = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationDetails, setLocationDetails] = useState<string>('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const getCurrentLocation = async () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const fetchLocationDetails = async () => {
    // Placeholder for geocoding functionality
    // Use an API like Google Geocoding API to get address details
    setLocationDetails(
      `Lat: ${region.latitude.toFixed(4)}, Lng: ${region.longitude.toFixed(4)}`,
    );
  };

  useEffect(() => {
    fetchLocationDetails();
  }, [region]);

  useEffect(() => {
    getCurrentLocation();
    //getIllness();
    //getMedication();
  }, []);

  const illness = useParameterStore.getState().illness;
  const medication = useParameterStore.getState().medication;

  return (
    <View style={styles.container}>
      <Input value={input1} onChangeText={setInput1} placeholder="Name" />
      <Input value={input2} onChangeText={setInput2} placeholder="Birth Date" />
      <Input
        value={input3}
        onChangeText={setInput3}
        placeholder="Input Field 3"
      />
      <Text>{locationDetails}</Text>
      <PickerSheet
        items={medication}
        onSelect={id => {
          console.log(id);
        }}
      />
      <PickerSheet
        items={illness}
        onSelect={id => {
          console.log(id);
        }}
      />
      <Button title="Select Location" onPress={openModal} />
      <Button title="Submit" onPress={() => {}} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContent}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChange}>
            {/* Empty body since the marker is floating and not tied to coordinates */}
          </MapView>
          <View style={styles.markerFixed}>
            <Text style={styles.marker}>📍</Text>
          </View>
          <Text style={styles.locationDetails}>{locationDetails}</Text>

          <Button title="Save Location" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  markerFixed: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -24,
    marginTop: -48,
  },
  marker: {
    fontSize: 48,
  },
  locationDetails: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
});

export default HomeScreen;
