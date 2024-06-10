import {
  EvacOperation,
  EvacPerson,
  EvacPersonResponse,
} from '../services/api/types/app.types';

export const AUTH_NAVIGATOR = 'AuthNavigator';
export const HOME_NAVIGATOR = 'TabNavigator';

export enum AuthScreens {
  Login = 'Login',
  Register = 'Register',
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export enum MainScreens {
  Home = 'Home',
  Profile = 'Profile',
  Map = 'Map',
  EvacProcess = 'EvacProcess',
}

export type MainStackParamList = {
  EvacProcess: undefined;
  LandingScreen: undefined;
  MapScreen: undefined;
  EvacProcessScreen: {data: EvacPerson};
  EvacutaionHistory: {data: EvacOperation[]};
};

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Map: undefined;
};

export type UserStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type UserProfileStackParamList = {
  UserProfileScreen: undefined;
  UsersPeople: {data: EvacPersonResponse};
  EvacPersonAdd: undefined;
  ChangePassword: undefined;
  AboutUs: undefined;
};

export type OperatorStackParamList = {
  ProfileScreen: undefined;
  EvacutaionHistory: undefined;
  ChangePassword: undefined;
  AboutUs: undefined;
};
