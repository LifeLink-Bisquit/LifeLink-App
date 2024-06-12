/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useUserProfileNavigation} from '../../../../hooks/useUserProfileNavigation';
import {
  UserProfileScreens,
  UserProfileStackParamList,
} from '../../../../navigation/routes';
import {EvacPerson} from '../../../../services/api/types/app.types';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import Screen from '../../../components/Screen/Screen';
import {styles} from './styles';

interface ProfileProps {
  navigation: any;
}

const UsersPeopleScreen: React.FC<ProfileProps> = () => {
  const {params} =
    useRoute<
      RouteProp<UserProfileStackParamList, UserProfileScreens.UsersPeople>
    >();
  const {navigate} = useUserProfileNavigation<UserProfileScreens.UsersPeople>();

  return (
    <Screen containerStyle={styles.screen} useSafeArea={false} useScrollView>
      {params?.data.items.map((person: EvacPerson) => (
        <View key={person.id} style={{width: '100%'}}>
          <EvacueeInfo
            evacPerson={person}
            onPress={() => {
              navigate(UserProfileScreens.EvacPersonEdit, {person});
            }}
            type="edit"
          />
        </View>
      ))}
    </Screen>
  );
};

export default UsersPeopleScreen;
