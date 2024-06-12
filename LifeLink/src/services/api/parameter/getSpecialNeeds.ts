import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useParameterStore from './store';

export const getSpecialNeeds = async (data?: any) => {
  const setSpecialNeeds = useParameterStore.getState().setSpecialNeeds;
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_SPECIAL_NEEDS'}`,
      data,
    )
    .then(response => {
      setSpecialNeeds(response.data.items);
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response,
      });
    });
};
