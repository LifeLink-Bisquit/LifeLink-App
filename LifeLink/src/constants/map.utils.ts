import {Linking, Platform} from 'react-native';

export const openMaps = (
  destination: {
    latitude: number;
    longitude: number;
  },
  label: string,
) => {
  const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  const latLng = `${destination.latitude},${destination.longitude}`;
  const url =
    Platform.OS === 'ios'
      ? `${scheme}?daddr=${latLng}(${label})`
      : `${scheme}?q=${latLng}(${label})`;

  Linking.openURL(url).catch(err => console.error('An error occurred', err));
};
