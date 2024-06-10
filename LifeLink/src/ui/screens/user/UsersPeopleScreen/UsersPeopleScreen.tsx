import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {UserProfileStackParamList} from '../../../../navigation/routes';
import {getEvacPersonStatusById} from '../../../../services/api/constants';
import {EvacPerson} from '../../../../services/api/types/app.types';
import ListItem from '../../../components/ListItem/ListItem';
import Screen from '../../../components/Screen/Screen';
import {styles} from './styles';
import EvacueeInfo from '../../../components/EvacPersonInfo/EvacPersonInfo';
import {View} from 'react-native';

interface ProfileProps {
  navigation: any;
}

const UsersPeopleScreen: React.FC<ProfileProps> = () => {
  const {params} =
    useRoute<RouteProp<UserProfileStackParamList, 'UsersPeople'>>();

  return (
    <Screen containerStyle={styles.screen} useSafeArea={false} useScrollView>
      {params?.data.items.map((person: EvacPerson) => (
        <View id={person.id} style={{width: '100%'}}>
          <EvacueeInfo evacPerson={person} />
        </View>
      ))}
    </Screen>
  );
};

export default UsersPeopleScreen;
