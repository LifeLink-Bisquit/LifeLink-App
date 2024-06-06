import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Text as RNText,
  StyleSheet,
  TextPropsAndroid,
  TextPropsIOS,
  TextStyle,
} from 'react-native';
import '../../../constants/translations.utils';

interface TextProps {
  style?: TextStyle;
  fontSize?: 'small' | 'medium' | 'large' | 'xLarge' | 'xxLarge';
  children: React.ReactNode;
  props?: TextPropsIOS | TextPropsAndroid;
  numberOfLines?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
}

const Text: React.FC<TextProps> = ({
  style,
  children,
  fontSize,
  props,
  numberOfLines,
  textAlign,
}) => {
  const {t} = useTranslation();
  const getFontSize = () => {
    switch (fontSize) {
      case 'small':
        return 14;
      case 'medium':
        return 16;
      case 'large':
        return 18;
      case 'xLarge':
        return 24;
      case 'xxLarge':
        return 32;
      default:
        return 16;
    }
  };
  return (
    <RNText
      style={[style, styles.text, {fontSize: getFontSize(), textAlign}]}
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      {...props}>
      {t(children?.toString() ?? '')}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'TiltNeon-Regular',
  },
});

export default Text;
