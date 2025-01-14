import axios from 'axios';
import GetLocation, {Location} from 'react-native-get-location';
import {MMKV} from 'react-native-mmkv';
import {User} from '../services/api/types/auth.types';

export const storage = new MMKV();

export const STORAGE_KEYS = {
  TOKEN: 'tkn',
  USER: 'usr',
};

export const BASE_URL =
  'https://dev-lifelink-bmgnbae6gtaugycy.northeurope-01.azurewebsites.net';

export enum PARAMETER_KEYS {
  USER_ROLE,
  FIELD_OPERATOR_STATUS,
  EVAC_PERSON_ILLNESS,
  EVAC_PERSON_MEDICATION,
  EVAC_PERSON_STATUS,
}

export enum GROUP_KEYS {
  'EVAC_PERSON',
  'USER',
  'FIELD_OPERATOR',
}

export const NEWS_SOURCE_URL = 'http://www.koeri.boun.edu.tr/scripts/lst9.asp';

export const getUser = () => {
  const userResponse = storage.getString(STORAGE_KEYS.USER) ?? '';
  const user = JSON.parse(userResponse) as User;
  return user;
};

export const getCurrentLocation = async ({
  onSuccess,
}: {
  onSuccess: (location: Location) => void;
}) => {
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(location => onSuccess(location))
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });
};

export const getLocationDescription = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<string> => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
        },
      },
    );

    if (response.data && response.data.display_name) {
      return response.data.display_name;
    } else {
      return 'Location description not found.';
    }
  } catch (error) {
    console.error(error);
    return 'An error occurred while retrieving the location description.';
  }
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function getSecondsSinceCreateTime(createTime: string): number {
  const createTimeDate = new Date(createTime);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createTimeDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  return diffInSeconds;
}
