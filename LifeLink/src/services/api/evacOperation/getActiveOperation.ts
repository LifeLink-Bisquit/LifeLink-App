import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import {ActiveOperationResponse} from '../types/app.types';

export const getActiveOperation = async (
  onSuccess: (data: ActiveOperationResponse) => void,
  onError?: () => void,
) => {
  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .get(`${BASE_URL}${'/evacOperation/getActiveEvacOperation'}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('first');
      console.log(response.data);
      onSuccess(response.data as ActiveOperationResponse);
    })
    .catch(error => {
      console.log(error.response.status);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response,
      });
      onError?.();
    });
};
