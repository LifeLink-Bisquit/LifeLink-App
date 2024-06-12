import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';

export const deleteEvacPerson = async (id: string, onSuccess: () => void) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .delete(`${BASE_URL}${'/evacPerson/'}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      console.log(error.response.status);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.title,
      });
      setLoading(false);
    });
};
