import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {UserProfileStackParamList} from '../../../../navigation/routes';
import {getEvacPersonStatusById} from '../../../../services/api/constants';
import {EvacPerson} from '../../../../services/api/types/app.types';
import ListItem from '../../../components/ListItem/ListItem';
import Screen from '../../../components/Screen/Screen';
import {styles} from './styles';

interface ProfileProps {
  navigation: any;
}

const UsersPeopleScreen: React.FC<ProfileProps> = () => {
  const {params} =
    useRoute<RouteProp<UserProfileStackParamList, 'UsersPeople'>>();

  return (
    <Screen containerStyle={styles.screen} useSafeArea={false} useScrollView>
      {params?.data.items.map((person: EvacPerson) => (
        <ListItem
          key={person.id}
          title={person.name}
          subtitle={`Age: ${person.age}\nLocation: (${
            person.location.latitude
          }, ${person.location.longitude})\nDescription: ${
            person.description
          }\nLocation Note: ${
            person.locationNote
          }\nStatus: ${getEvacPersonStatusById(
            person.status,
          )}\nAssigned Operators: ${person.assignedOperators.join(', ')}`}
        />
      ))}
    </Screen>
  );
};

export default UsersPeopleScreen;
