import React from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  ViewStyle,
  StyleProp,
  View,
} from 'react-native';
import Text from '../Text/Text';
import {Colors} from '../../../constants/colors';

interface ListItemProps {
  onPress?: () => void;
  title: string;
  subtitle?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const ListItem: React.FC<ListItemProps> = ({
  onPress,
  title,
  subtitle,
  leftItem,
  rightItem,
  containerStyle,
}) => {
  return (
    <TouchableHighlight
      style={[styles.container, containerStyle]}
      underlayColor="#DDDDDD"
      onPress={onPress}>
      <View style={styles.contentContainer}>
        {leftItem && <View style={styles.leftItemContainer}>{leftItem}</View>}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightItem && (
          <View style={styles.rightItemContainer}>{rightItem}</View>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  leftItemContainer: {
    marginRight: 10,
  },
  rightItemContainer: {
    marginLeft: 'auto',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.black,
  },
});

export default ListItem;
