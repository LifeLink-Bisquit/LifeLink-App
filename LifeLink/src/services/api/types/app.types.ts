export interface EvacPersonRequest {
  name: string;
  birthDate: string;
  medications: string[];
  illnesses: string[];
  description: string;
  location: Location;
  locationNote: string;
}

export interface EvacPersonResponse {
  count: number;
  items: EvacPerson[];
}

export interface EvacPerson {
  id: string;
  creatorId: string;
  createTime: string;
  modifierId: string;
  modifyTime: string;
  name: string;
  birthDate: string;
  age: number;
  medications: any[];
  illnesses: any[];
  description: string;
  location: Location;
  locationNote: any;
  assignedOperators: string[];
  status: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ActiveOperationResponse {
  id: string;
  creatorId: string;
  createTime: string;
  modifierId: string;
  modifyTime: string;
  fieldOperatorId: string;
  evacPersonId: string;
  status: string;
}
