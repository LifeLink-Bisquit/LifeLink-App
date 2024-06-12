import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OperatorStackParamList} from '../navigation/routes';

export const useOperatorNavigation = <
  T extends keyof OperatorStackParamList,
>() => {
  return useNavigation<NativeStackNavigationProp<OperatorStackParamList, T>>();
};
