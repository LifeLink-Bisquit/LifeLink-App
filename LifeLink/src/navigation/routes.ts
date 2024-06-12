import {
  ActiveOperationResponse,
  EvacOperation,
  EvacPerson,
  EvacPersonResponse,
} from '../services/api/types/app.types';

export const AUTH_NAVIGATOR = 'AuthNavigator';
export const HOME_NAVIGATOR = 'HomeNavigator';

export enum AuthScreens {
  Login = 'Login',
  Register = 'Register',
}

export type AuthStackParamList = {
  [AuthScreens.Login]: undefined;
  [AuthScreens.Register]: undefined;
};

export enum MainScreens {
  Home = 'Home',
  Profile = 'ProfileTab',
  Map = 'MapTab',
  EvacProcess = 'EvacProcess',
  Landing = 'Landing',
}

export type MainStackParamList = {
  [MainScreens.Home]: undefined;
  [MainScreens.Profile]: undefined;
  [MainScreens.Map]: undefined;
  [MainScreens.EvacProcess]: {data: ActiveOperationResponse};
  [MainScreens.Landing]: undefined;
  EvacProcessDetail: {data: EvacPerson};
  EvacuationHistory: {data: EvacOperation[]};
};

export type RootStackParamList = {
  [MainScreens.Home]: undefined;
  [MainScreens.Profile]: undefined;
  [MainScreens.Map]: undefined;
};

export type UserStackParamList = {
  [MainScreens.Home]: undefined;
  [MainScreens.Profile]: undefined;
};

export enum UserProfileScreens {
  UserProfile = 'UserProfile',
  UsersPeople = 'UsersPeople',
  EvacPersonAdd = 'EvacPersonAdd',
  EvacPersonEdit = 'EvacPersonEdit',
  ChangePassword = 'ChangePassword',
  AboutUs = 'AboutUs',
}

export type UserProfileStackParamList = {
  [UserProfileScreens.UserProfile]: undefined;
  [UserProfileScreens.UsersPeople]: {data: EvacPersonResponse};
  [UserProfileScreens.EvacPersonAdd]: undefined;
  [UserProfileScreens.EvacPersonEdit]: {person: EvacPerson};
  [UserProfileScreens.ChangePassword]: undefined;
  [UserProfileScreens.AboutUs]: undefined;
};

export enum OperatorScreens {
  Profile = 'Profile',
  EvacuationHistory = 'EvacuationHistory',
  ChangePassword = 'ChangePassword',
  AboutUs = 'AboutUs',
}

export type OperatorStackParamList = {
  [OperatorScreens.Profile]: undefined;
  [OperatorScreens.EvacuationHistory]: {items: EvacOperation[]};
  [OperatorScreens.ChangePassword]: undefined;
  [OperatorScreens.AboutUs]: undefined;
};

export const AppPaths = {
  Auth: {
    Navigator: AUTH_NAVIGATOR,
    Screens: AuthScreens,
  },
  Home: {
    Navigator: HOME_NAVIGATOR,
    Screens: MainScreens,
  },
  UserProfile: {
    Screens: UserProfileScreens,
  },
  Operator: {
    Screens: OperatorScreens,
  },
};
