import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TickIcon from '../../../../assets/svgs/tick.svg';
import {Colors} from '../../../constants/colors';
import {Item} from '../../../services/api/parameter/types';
import Button from '../Button/Button';

interface PickerSheetProps {
  items: Item[];
  onSelect: (ids: any[]) => void;
  label: string;
  selectedItems?: any[];
}

const PickerSheet: React.FC<PickerSheetProps> = ({
  items,
  onSelect,
  label,
  selectedItems = [],
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [selectedIds, setSelectedIds] = useState<any[]>(selectedItems);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectedIds(selectedItems);
    }
  }, [selectedItems]);

  // handle open bottom sheet
  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.present(); // Corrected method to open the modal
  }, []);

  // handle select item
  const handleSelect = useCallback((id: any) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  }, []);

  // handle confirm selection
  const handleConfirm = useCallback(() => {
    onSelect(selectedIds);
    bottomSheetRef.current?.dismiss(); // Corrected method to close the modal
  }, [onSelect, selectedIds]);

  // rendering the list of items
  const renderItem = useCallback(
    (item: Item) => {
      const isSelected = selectedIds.includes(item.id);
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => handleSelect(item.id)}>
          <Text style={styles.label}>{item.value}</Text>
          {isSelected && (
            <TickIcon width={15} height={15} color={Colors.secondary} />
          )}
        </TouchableOpacity>
      );
    },
    [handleSelect, selectedIds],
  );

  const {bottom} = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    props => (
      <TouchableOpacity
        style={[props.style, styles.backdrop]}
        activeOpacity={1}
        onPress={() => {
          handleConfirm();
          bottomSheetRef.current?.dismiss();
        }}
      />
    ),
    [handleConfirm],
  );

  return (
    <>
      <Button onPress={handleOpen} label={label} fullWidth />
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        containerStyle={styles.backdrop}
        handleStyle={styles.handle}
        handleIndicatorStyle={{backgroundColor: Colors.secondary}}
        enableDynamicSizing
        enablePanDownToClose={false}
        enableOverDrag={false}
        backdropComponent={renderBackdrop}>
        <BottomSheetView
          style={[styles.contentContainer, {paddingBottom: bottom}]}>
          {items.map(renderItem)}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  backdrop: {backgroundColor: 'rgba(0,0,0,0.5)'},
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: Colors.primary,
  },
  handle: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});

export default PickerSheet;
