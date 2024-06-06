import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';

export const startEvacOperation = async (id: string, onSuccess: () => void) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  console.log('token', token);
  console.log('url', `${BASE_URL}/evacOperation/startEvac/${id}`);

  axios
    .post(
      `${BASE_URL}/evacOperation/startEvac/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(() => {
      setLoading(false);
      onSuccess();
    })
    .catch(error => {
      console.log(JSON.stringify(error.response.status));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.title,
      });
      setLoading(false);
    });
};
