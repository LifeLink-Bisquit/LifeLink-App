import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useParameterStore from './store';

export const getProthesis = async (data?: any) => {
  const setProsthesis = useParameterStore.getState().setProsthesis;
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_PROSTHESIS'}`,
      data,
    )
    .then(response => {
      setProsthesis(response.data.items);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response,
      });
    });
};
