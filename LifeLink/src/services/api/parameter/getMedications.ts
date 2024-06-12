import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useParameterStore from './store';

export const getMedication = async (data?: any) => {
  const setMedication = useParameterStore.getState().setMedication;
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_MEDICATION'}`,
      data,
    )
    .then(response => {
      setMedication(response.data.items);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response,
      });
    });
};
