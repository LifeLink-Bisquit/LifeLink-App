export interface EvacPersonRequest {
  name: string;
  birthDate: string;
  medications: string[];
  illnesses: string[];
  specialNeeds: any[];
  prosthesis: string[];
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
  medications: string[];
  illnesses: string[];
  specialNeeds: any[];
  prosthesis: string[];
  description: string;
  location: Location;
  locationNote: string;
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

export enum EvacPersonStatus {
  Safe = '961a1ae7-6d3c-4e47-bce1-049cec49cce0',
  Unknown = '961a1ae7-6d3c-4e47-bce1-049cec49cce1',
  NeedsAssistance = '961a1ae7-6d3c-4e47-bce1-049cec49cce2',
  GettingTreatment = '961a1ae7-6d3c-4e47-bce1-049cec49cce3',
  Deceased = '961a1ae7-6d3c-4e47-bce1-049cec49cce4',
  Neutral = '961a1ae7-6d3c-4e47-bce1-049cec49cce5',
}

export interface EvacOperation {
  id: string;
  creatorId: string;
  createTime: string;
  modifierId: string;
  modifyTime: string;
  fieldOperatorId: string;
  evacPersonId: string;
  status: string;
}
