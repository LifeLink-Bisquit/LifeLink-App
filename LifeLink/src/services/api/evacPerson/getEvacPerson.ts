import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';

export const getEvacPerson = async (id: string, onSuccess: (data) => void) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);
  console.log(id);
  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .get(`${BASE_URL}/evacPerson/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(data => {
      setLoading(false);
      onSuccess(data.data);
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
