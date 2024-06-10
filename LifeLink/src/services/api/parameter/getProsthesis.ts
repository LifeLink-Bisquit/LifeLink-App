import axios from 'axios';

import Toast from 'react-native-toast-message';
import {BASE_URL} from '../../../constants/app.utils';
import useGeneralStore from '../../../zustand/generalStore';
import useParameterStore from './store';

export const getProthesis = async (data?: any) => {
  const setLoading = useGeneralStore.getState().setLoadingState;
  const setProsthesis = useParameterStore.getState().setProsthesis;
  setLoading(true);
  axios
    .get(
      `${BASE_URL}${'/parameter/getParametersByParameterKey/'}${'EVAC_PERSON_PROSTHESIS'}`,
      data,
    )
    .then(response => {
      setProsthesis(response.data.items);
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
