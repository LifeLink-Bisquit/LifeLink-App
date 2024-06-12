import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Colors} from '../../../constants/colors';
import {EvacPersonStatus} from '../../../services/api/types/app.types';
import Button from '../Button/Button';

interface EvacuationStatusModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectStatus: (status: EvacPersonStatus) => void;
}

const EvacuationStatusModal: React.FC<EvacuationStatusModalProps> = ({
  visible,
  onClose,
  onSelectStatus,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalContent}>
            <Button
              label="SAFE"
              onPress={() => onSelectStatus(EvacPersonStatus.Safe)}
            />
            <Button
              label="UNKNOWN"
              onPress={() => onSelectStatus(EvacPersonStatus.Unknown)}
            />
            <Button
              label="NEEDS_ASSISTANCE"
              onPress={() => onSelectStatus(EvacPersonStatus.NeedsAssistance)}
            />
            <Button
              label="GETTING_TREATMENT"
              onPress={() => onSelectStatus(EvacPersonStatus.GettingTreatment)}
            />
            <Button
              label="DECEASED"
              onPress={() => onSelectStatus(EvacPersonStatus.Deceased)}
            />
            <Button
              label="NEUTRAL"
              onPress={() => onSelectStatus(EvacPersonStatus.Neutral)}
            />
          </View>
          <Button label="close" onPress={onClose} variant="secondary" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EvacuationStatusModal;
