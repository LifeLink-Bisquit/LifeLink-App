import React from 'react';
import {
  Age,
  Container,
  Image,
  InfoContainer,
  Location,
  MedicineInfo,
  Name,
} from './styles';
import {EvacueeInfoProps} from './types';
import Avatar from '../Avatar/Avatar';

const EvacueeInfo: React.FC<EvacueeInfoProps> = ({
  name,
  age,
  medicineInfo,
  location,
}) => {
  return (
    <Container>
      <Avatar text={name ?? ''} size={80} />
      <InfoContainer>
        <Name>{name}</Name>
        <Age>Age: {age}</Age>
        <MedicineInfo>Medicine: {medicineInfo}</MedicineInfo>
        <Location>Location: {location}</Location>
      </InfoContainer>
    </Container>
  );
};

export default EvacueeInfo;
