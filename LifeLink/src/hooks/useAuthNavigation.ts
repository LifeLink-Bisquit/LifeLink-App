import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/routes';

export const useAuthNavigation = <T extends keyof AuthStackParamList>() => {
  return useNavigation<NativeStackNavigationProp<AuthStackParamList, T>>();
};
