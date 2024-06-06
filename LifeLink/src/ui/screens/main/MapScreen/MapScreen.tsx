/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import {openMaps} from '../../../../constants/map.utils';
import {getAllEvacPerson} from '../../../../services/api/evacPerson/getAllEvacPerson';
import {EvacPerson} from '../../../../services/api/types/app.types';
import Button from '../../../components/Button/Button';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Text from '../../../components/Text/Text';
import {Coordinate} from './constans';
import {startEvacOperation} from '../../../../services/api/evacOperation/startEvac';
import {getActiveOperation} from '../../../../services/api/evacOperation/getActiveOperation';
import Screen from '../../../components/Screen/Screen';

const INITIAL_REGION = {
  latitude: 42.5,
  longitude: 42.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const CustomBackdrop = props => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      enableTouchThrough={false}
      opacity={0.4}
    />
  );
};

const MapScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const [markerStatus, setMarkerStatus] = useState<string>('green');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [clusterLocation, setClusterLocation] = useState<EvacPerson[]>();
  const [data, setData] = useState<EvacPerson[]>([]);
  const [selectedUser, setSelectedUser] = useState<EvacPerson>(
    {} as EvacPerson,
  );
  const [bottomSheetContent, setBottomSheetContent] = useState<
    'info' | 'cluster'
  >('info');

  const handleMarkerPress = (user: EvacPerson) => {
    setSelectedMarker(user.location);
    setBottomSheetContent('info');
    setSelectedUser(user);
    bottomSheetRef.current?.expand();
  };

  const handleChangeStatus = (status: string) => {
    setMarkerStatus(status);
    bottomSheetRef.current?.collapse();
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

  useEffect(() => {
    getCurrentLocation();
    getAllEvacPerson(response => {
      setData(response.items);
    });
  }, []);

  const [region, setRegion] = useState(INITIAL_REGION);

  return (
    <Screen useSafeArea={false}>
      <MapView
        onClusterPress={(cluster, markers) => {
          const locations = markers?.map(marker => ({
            latitude: marker.properties.coordinate.latitude,
            longitude: marker.properties.coordinate.longitude,
          }));

          const filteredData = data.filter(item => {
            const itemLocation = {
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            };
            return locations?.some(location => {
              return (
                location.latitude === itemLocation.latitude &&
                location.longitude === itemLocation.longitude
              );
            });
          });
          setClusterLocation(filteredData);
          setBottomSheetContent('cluster');
          bottomSheetRef.current?.expand();
        }}
        ref={mapRef}
        showsUserLocation={true}
        region={region}
        minPoints={1}
        style={styles.map}>
        {data.map(item => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            onPress={() => handleMarkerPress(item)}
          />
        ))}
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        index={-1}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose={true}>
        <BottomSheetView style={styles.bottomSheetContainer}>
          {bottomSheetContent === 'info' ? (
            <>
              <EvacueeInfo
                age={selectedUser.age}
                imageUrl="https://fastly.picsum.photos/id/281/300/300.jpg?hmac=M1ECxENtZTA9gbkNhZXKZASKpDH3VcYjpr3HmLFwwrk"
                location="Beyoglu, Istanbul"
                medicineInfo='{"medicine": "Aspirin", "dose": "2"}'
                name={selectedUser.name}
              />

              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  paddingHorizontal: 10,
                  marginBottom: 20,
                }}>
                <Button
                  props={{disabled: buttonLoading}}
                  isLoading={buttonLoading}
                  onPress={() => {
                    startEvacOperation(selectedUser.id, () => {
                      navigation.navigate('EvacProcessScreen');
                    });
                  }}
                  label="linkToLife"
                />
                <Button
                  onPress={() => {
                    openMaps(
                      {latitude: 41.0322, longitude: 29.0319},
                      'Destination',
                    );
                  }}
                  label="Get Directions"
                />
              </View>
            </>
          ) : (
            <>
              {clusterLocation &&
                clusterLocation.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      handleMarkerPress(item);
                    }}
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      gap: 10,
                    }}>
                    <Text>{item.name}</Text>
                    <Text>{item.age}</Text>
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                ))}
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    </Screen>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomSheetText: {
    fontSize: 16,
    marginBottom: 10,
  },
  statusButton: {
    marginBottom: 10,
  },
  statusButtonText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
