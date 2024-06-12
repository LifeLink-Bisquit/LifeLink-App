import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {ResetPasswordRequest} from '../types/auth.types';

export const resetPassword = async (
  data: ResetPasswordRequest,
  onSuccess: () => void,
) => {
  const token = storage.getString(STORAGE_KEYS.TOKEN);

  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);
  axios
    .post(`${BASE_URL}${'/user/resetPassword'}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Parola değiştirildi.',
      });
      onSuccess();
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: JSON.stringify(error),
      });
      setLoading(false);
    });
};
