/* eslint-disable react-native/no-inline-styles */
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import GetLocation from 'react-native-get-location';
import MapView from 'react-native-map-clustering';
import {Marker} from 'react-native-maps';
import {openMaps} from '../../../../constants/map.utils';
import {startEvacOperation} from '../../../../services/api/evacOperation/startEvac';
import {getAllEvacPerson} from '../../../../services/api/evacPerson/getAllEvacPerson';
import {EvacPerson} from '../../../../services/api/types/app.types';
import Button from '../../../components/Button/Button';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const INITIAL_REGION = {
  latitude: 42.5,
  longitude: 42.2,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const CustomBackdrop = (
  props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
) => {
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
  const {goBack} = useNavigation();
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
    setBottomSheetContent('info');
    setSelectedUser(user);
    bottomSheetRef.current?.expand();
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
        {bottomSheetContent === 'info' ? (
          <BottomSheetView style={styles.bottomSheetContainer}>
            <EvacueeInfo evacPerson={selectedUser} />
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <Button
                onPress={() => {
                  startEvacOperation(selectedUser.id, () => {
                    goBack();
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
                label="getDirections"
              />
            </View>
          </BottomSheetView>
        ) : (
          <BottomSheetScrollView style={styles.bottomSheetContainer}>
            <Spacer height={50} />
            {clusterLocation &&
              clusterLocation.map((item, index) => (
                <EvacueeInfo
                  key={index}
                  evacPerson={item}
                  onPress={() => {
                    handleMarkerPress(item);
                  }}
                />
              ))}
            <Spacer height={50} />
          </BottomSheetScrollView>
        )}
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
