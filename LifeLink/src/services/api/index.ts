import axios from 'axios';
import useGeneralStore from '../../zustand/generalStore';
import {BASE_URL, storage} from '../../constants/app.utils';
import Toast from 'react-native-toast-message';

export const sendPostRequest = async (url: string, data?: any) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  const setLogin = useGeneralStore.getState().setLoginState;
  setLoading(true);
  axios
    .post(`${BASE_URL}${url}`, data)
    .then(response => {
      if (response.data.token) {
        storage.set('tkn', response.data.token);
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
