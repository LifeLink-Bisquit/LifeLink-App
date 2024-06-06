import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Region} from 'react-native-maps';
import {
  getCurrentLocation,
  getLocationDescription,
} from '../../../../constants/app.utils';
import {signUp} from '../../../../services/api/auth/postRegister';
import {
  PERSON_ROLE,
  TR_PHONE_CODE,
  TR_PHONE_PREFIX,
} from '../../../../services/api/constants';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Screen from '../../../components/Screen/Screen';
import Text from '../../../components/Text/Text';
import {styles} from './styles';

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [password, setPassword] = useState<string>('');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [locationDetails, setLocationDetails] = useState<string>('');
  const [region, setRegion] = useState<Region>();

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

  const {navigate} = useNavigation();

  const handleRegistration = () => {
    const payload = {
      email,
      name,
      birthDate: birthDate.toISOString(),
      role: PERSON_ROLE,
      password,
      phone: TR_PHONE_CODE + phone,
      location: {
        latitude: region?.latitude.toString() ?? '',
        longitude: region?.longitude.toString() ?? '',
      },
      locationNote: locationDetails,
    };
    console.log(payload);
    signUp(payload, () => {
      navigate('Login');
    });
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

  return (
    <Screen containerStyle={styles.screen} useKeyboardAvoidingView={true}>
      <View style={styles.input}>
        <Text fontSize="small">{'registerInfoText'}</Text>
        <Input value={name} onChangeText={setName} placeholder="name" />
        <Input value={email} onChangeText={setEmail} placeholder="email" />
        <Input
          value={phone}
          onChangeText={setPhone}
          placeholder="phone"
          keyboardType="phone-pad"
          prefixText={TR_PHONE_PREFIX}
        />

        <Input
          isPassword={true}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          keyboardType="numeric"
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
      </View>
      <Button label="register" onPress={handleRegistration} fullWidth />

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

export default RegisterScreen;
