import {Button, Image, Text, View} from 'react-native';
import styled from 'styled-components';

export const Avatar = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const Name = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

export const Email = styled(Text)`
  font-size: 18px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 20px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 30px;
`;

export const SettingsContainer = styled(View)`
  gap: 5px;
  width: 100%;
  margin-top: 20px;
`;
