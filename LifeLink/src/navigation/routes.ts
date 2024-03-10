// Constants defining names for navigators
export const AUTH_NAVIGATOR = 'AuthNavigator';
export const HOME_NAVIGATOR = 'TabNavigator';

export enum AuthScreens {
  Login = 'Login',
}

export type AuthStackParamList = {
  Login: undefined;
};

export enum MainScreens {
  Home = 'Home',
}

export type MainStackParamList = {
  Home: undefined;
};
