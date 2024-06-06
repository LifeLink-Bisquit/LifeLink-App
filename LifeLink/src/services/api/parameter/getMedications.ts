import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import useParameterStore from './store';

export const getMedication = async (data?: any) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  const setMedication = useParameterStore.getState().setMedication;
  setLoading(true);
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_MEDICATION'}`,
      data,
    )
    .then(response => {
      setMedication(response.data.items);
      setLoading(false);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response,
      });
      setLoading(false);
    });
};
