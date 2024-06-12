import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import CrossIcon from '../../../../assets/svgs/cross.svg';
import DownIcon from '../../../../assets/svgs/down.svg';
import EditIcon from '../../../../assets/svgs/pencil.svg';
import {Colors} from '../../../constants/colors';
import {getEvacPersonStatusById} from '../../../services/api/constants';
import Avatar from '../Avatar/Avatar';
import ParameterList from '../ParameterList/ParameterList';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import {EvacueeInfoProps} from './types';

const EvacueeInfo: React.FC<EvacueeInfoProps> = ({
  evacPerson,
  onPress,
  type,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress ?? toggleExpand}>
        <View style={styles.innerContainer}>
          <Avatar text={evacPerson?.name ?? ''} size={80} />
          <View style={styles.infoContainer}>
            <Text style={styles.name} fontSize="xLarge">
              {evacPerson?.name}
            </Text>
            <Text style={styles.text} fontSize="large">
              {getEvacPersonStatusById(evacPerson?.status ?? '')}
            </Text>
            <Text style={styles.text} fontSize="large">
              {evacPerson?.description ?? ''}
            </Text>
          </View>
          {type === 'edit' ? (
            <EditIcon style={styles.icon} />
          ) : (
            <DownIcon style={styles.icon} />
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={expanded} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.details}>
              <Text fontSize="xLarge" style={styles.text}>
                {'details'}
              </Text>
              <TouchableOpacity
                onPress={toggleExpand}
                style={styles.closeButton}>
                <CrossIcon color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>{'description'}</Text>
              <Text style={styles.text}>{evacPerson?.description}</Text>
            </View>
            <Spacer height={10} />
            <View>
              <Text>{'location'}</Text>
              <Text style={styles.text}>{evacPerson?.locationNote}</Text>
            </View>
            <Spacer height={10} />
            <View>
              <Text>{'status'}</Text>
              <Text style={styles.text}>
                {getEvacPersonStatusById(evacPerson?.status ?? '')}
              </Text>
            </View>
            <Spacer height={10} />
            <View>
              <Text>{'age'}</Text>
              <Text style={styles.text}>{evacPerson?.age}</Text>
            </View>
            <ParameterList
              data={evacPerson?.medications ?? []}
              variant="medic"
            />
            <ParameterList
              data={evacPerson?.illnesses ?? []}
              variant="illness"
            />
            <ParameterList
              data={evacPerson?.prosthesis ?? []}
              variant="prosthesis"
            />
            <ParameterList
              data={evacPerson?.specialNeeds ?? []}
              variant="special_needs"
            />
            <Spacer height={80} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.white,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default EvacueeInfo;
