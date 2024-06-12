import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/routes';

export const useMainNavigation = <T extends keyof MainStackParamList>() => {
  return useNavigation<NativeStackNavigationProp<MainStackParamList, T>>();
};
