import React from 'react';
import {View, ViewStyle} from 'react-native';

interface SpacerProps {
  height: number;
}

const Spacer: React.FC<SpacerProps> = ({height}) => {
  const spacerStyle: ViewStyle = {
    height,
  };

  return <View style={spacerStyle} />;
};

export default Spacer;
