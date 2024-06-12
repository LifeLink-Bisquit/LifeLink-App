import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {UserProfileStackParamList} from '../navigation/routes';

export const useUserProfileNavigation = <
  T extends keyof UserProfileStackParamList,
>() => {
  return useNavigation<
    NativeStackNavigationProp<UserProfileStackParamList, T>
  >();
};
