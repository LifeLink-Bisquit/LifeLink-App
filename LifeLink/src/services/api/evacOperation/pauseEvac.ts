import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';

export const pauseEvacOperation = async (id: string, onSuccess: () => void) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .post(
      `${BASE_URL}/evacOperation/pauseEvac/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the bearer token to the request headers
        },
      },
    )
    .then(() => {
      setLoading(false);
      onSuccess();
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
