import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useParameterStore from './store';

export const getIllness = async (data?: any) => {
  const setIllness = useParameterStore.getState().setIllness;
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_ILLNESS'}`,
      data,
    )
    .then(response => {
      setIllness(response.data.items);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.status,
      });
    });
};
