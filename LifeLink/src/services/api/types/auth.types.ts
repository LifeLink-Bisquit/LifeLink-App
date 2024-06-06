export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  phone?: string;
  name: string;
  birthDate?: string;
  role: string;
  password: string;
  location: Location;
  locationNote: string;
}

export interface Location {
  latitude: string;
  longitude: string;
}

export interface User {
  birthDate: string;
  createTime: string;
  creatorId: string;
  email: string;
  id: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  modifierId: string;
  modifyTime: string;
  name: string;
  phone: string;
  role: string;
  token: string;
}
