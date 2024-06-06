import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import useParameterStore from './store';

export const getIllness = async (data?: any) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  const setIllness = useParameterStore.getState().setIllness;
  setLoading(true);
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_ILLNESS'}`,
      data,
    )
    .then(response => {
      setIllness(response.data.items);
      setLoading(false);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.status,
      });
      setLoading(false);
    });
};
