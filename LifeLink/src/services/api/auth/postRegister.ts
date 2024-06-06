import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {SignUpRequest} from '../types/auth.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export const signUp = async (data: SignUpRequest, onSuccess: () => void) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);
  axios
    .post(`${BASE_URL}${'/user/signup'}`, data)
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
