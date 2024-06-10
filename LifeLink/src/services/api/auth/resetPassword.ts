import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {ResetPasswordRequest} from '../types/auth.types';

export const resetPassword = async (data: ResetPasswordRequest) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);
  axios
    .post(`${BASE_URL}${'/user/resetPassword'}`, data)
    .then(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
      });
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
