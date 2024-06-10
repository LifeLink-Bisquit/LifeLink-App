import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useEffect, useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import useParameterStore from '../../../../services/api/parameter/store';
import Input from '../../../components/Input/Input';
import PickerSheet from '../../../components/PickerSheet/PickerSheet';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import {styles} from './styles';

import MapView from 'react-native-map-clustering';
import {Region} from 'react-native-maps';
import {
  getCurrentLocation,
  getLocationDescription,
} from '../../../../constants/app.utils';
import {createEvacPerson} from '../../../../services/api/evacPerson/createEvacPerson';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';

const EvacPersonAddScreen: React.FC = () => {
  const {goBack} = useNavigation();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [description, setDescription] = useState('');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [locationDetails, setLocationDetails] = useState<string>('');
  const [region, setRegion] = useState<Region>();

  const illnessChoices = useParameterStore.getState().illness;
  const medicationChoices = useParameterStore.getState().medication;
  const prothesisChoices = useParameterStore.getState().prosthesis;
  const specialNeedsChoices = useParameterStore.getState().specialNeeds;

  const [illnesses, setIllness] = useState<string[]>([]);
  const [medications, setMedication] = useState<string[]>([]);
  const [prosthesis, setProthesis] = useState<string[]>([]);
  const [specialNeeds, setSpecialNeeds] = useState<string[]>([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setModalVisible(false);
    getLocationDescription({
      latitude: region?.latitude ?? 0,
      longitude: region?.longitude ?? 0,
    }).then(setLocationDetails);
  };

  const onRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  useEffect(() => {
    getCurrentLocation({
      onSuccess(currentLocation) {
        setRegion({
          longitude: currentLocation.longitude,
          latitude: currentLocation.latitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
    });
  }, []);

  const handleAddPerson = () => {
    createEvacPerson(
      {
        birthDate: birthDate.toISOString(),
        description,
        name,
        medications,
        illnesses,
        specialNeeds,
        prosthesis,
        location: {
          latitude: region?.latitude ?? 0,
          longitude: region?.longitude ?? 0,
        },
        locationNote: locationDetails ?? '',
      },
      () => {
        goBack();
        goBack();
      },
    );
  };

  return (
    <Screen containerStyle={styles.screen}>
      <View style={styles.form}>
        <Input value={name} onChangeText={setName} placeholder="name" />
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="description"
        />

        <TouchableOpacity style={styles.date}>
          <Text fontSize="small">{'birthDate'}</Text>
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              setBirthDate(selectedDate ?? new Date())
            }
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.location} onPress={openModal}>
          <Text style={styles.locationPre} fontSize="small">
            {'location'}
          </Text>
          <Text
            style={styles.locationDetail}
            numberOfLines={1}
            textAlign="right">
            {locationDetails || 'selectLocation'}
          </Text>
        </TouchableOpacity>

        <PickerSheet
          items={medicationChoices}
          onSelect={ids => {
            setMedication(ids);
          }}
          label={'chooseMedication'}
        />
        <PickerSheet
          items={illnessChoices}
          onSelect={ids => {
            setIllness(ids);
          }}
          label={'chooseIllness'}
        />

        <PickerSheet
          items={prothesisChoices}
          onSelect={ids => {
            setProthesis(ids);
          }}
          label={'chooseProsthesis'}
        />

        <PickerSheet
          items={specialNeedsChoices}
          onSelect={ids => {
            setSpecialNeeds(ids);
          }}
          label={'chooseSpecialNeeds'}
        />
      </View>

      <View style={styles.save}>
        <Button label="savePerson" onPress={handleAddPerson} />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContent}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={onRegionChange}
          />
          <View style={styles.markerFixed}>
            <Text style={styles.marker}>📍</Text>
          </View>

          <Button label="save" onPress={closeModal} />
        </View>
      </Modal>
    </Screen>
  );
};

export default EvacPersonAddScreen;
