import {View} from 'react-native';
import styled from 'styled-components';
import Text from '../Text/Text';
import FastImage from 'react-native-fast-image';

export const Container = styled(View)`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  flex-direction: row;
`;

export const Image = styled(FastImage)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
`;

export const InfoContainer = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
`;

export const Name = styled(Text)`
  margin: 0;
  font-size: 18px;
`;

export const Age = styled(Text)`
  margin: 5px 0;
  font-size: 16px;
  color: #666;
`;

export const MedicineInfo = styled(Text)`
  margin: 5px 0;
  font-size: 14px;
  color: #333;
`;

export const Location = styled(Text)`
  margin: 5px 0;
  font-size: 14px;
  color: #333;
`;
