import axios from 'axios';
import Toast from 'react-native-toast-message';
import {BASE_URL, STORAGE_KEYS, storage} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';

export const completeEvac = async (
  id: string,
  status: string,
  onSuccess: () => void,
) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  setLoading(true);

  const token = storage.getString(STORAGE_KEYS.TOKEN);

  axios
    .put(
      `${BASE_URL}/evacOperation/endEvac/${id}`,
      {evacPersonStatus: status},
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
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.title,
      });
    });
};
