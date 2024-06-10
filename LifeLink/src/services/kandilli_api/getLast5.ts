import axios from 'axios';
import Toast from 'react-native-toast-message';
import {API_URL} from './constants';
import {Earthquake} from './types';
import useGeneralStore from '../../zustand/generalStore';

export const getLast5EarthQuakes = async (
  onSuccess: (data: Earthquake[]) => void,
) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  axios
    .get(API_URL)
    .then(data => {
      setLoading(false);
      const result = data.data.result;
      onSuccess(result);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.title,
      });
      setLoading(false);
    });
};
