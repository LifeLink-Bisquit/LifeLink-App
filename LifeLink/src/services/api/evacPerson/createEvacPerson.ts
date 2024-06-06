import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {EvacPersonRequest} from '../types/app.types';

export const createEvacPerson = async (
  data: EvacPersonRequest,
  onSuccess: () => void,
) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .post(`${BASE_URL}${'/evacPerson'}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the bearer token to the request headers
      },
    })
    .then(response => {
      if (response.data.token) {
        storage.set(STORAGE_KEYS.TOKEN, response.data.token);
      }
      setLoading(false);
      onSuccess();
    })
    .catch(error => {
      console.log(error.response?.data);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.title,
      });
      setLoading(false);
    });
};
