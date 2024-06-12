import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import {EvacPersonRequest} from '../types/app.types';

export const updateEvacPerson = async (
  data: {evacPerson: EvacPersonRequest; evacOperationId: string},
  onSuccess: () => void,
) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .put(
      `${BASE_URL}${'/evacPerson/'}${data.evacOperationId}`,
      data.evacPerson,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(() => {
      setLoading(false);
      onSuccess();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Evacuation person updated successfully.',
      });
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
