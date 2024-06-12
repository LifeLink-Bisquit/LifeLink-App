import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {EvacOperation} from '../types/app.types';

export const getAllEvacOperations = async (
  onSuccess: (data: EvacOperation[]) => void,
) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .get(`${BASE_URL}${'/evacOperation/getEvacOperations'}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      onSuccess(response.data.items as EvacOperation[]);
      setLoading(false);
    })
    .catch(error => {
      Toast.show({
        type: 'info',
        text1: 'Error',
        text2: error.response.data.title,
      });
      setLoading(false);
    });
};
