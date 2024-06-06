import axios from 'axios';

import Toast from 'react-native-toast-message';
import useGeneralStore from '../../../zustand/generalStore';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import {LoginRequest} from '../types/auth.types';

export const login = async (data: LoginRequest) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  const setLogin = useGeneralStore.getState().setLoginState;
  setLoading(true);
  axios
    .post(`${BASE_URL}${'/user/login'}`, data)
    .then(response => {
      if (response.data.token) {
        storage.set(STORAGE_KEYS.TOKEN, response.data.token);
        storage.set(STORAGE_KEYS.USER, JSON.stringify(response.data));
      }
      setLoading(false);
      setLogin(true);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response.data.detail,
      });
      setLoading(false);
    });
};
