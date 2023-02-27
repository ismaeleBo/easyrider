export const WelcomeStackRouteNames = {
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
} as const;

export type WelcomeStackParamList = {
  [WelcomeStackRouteNames.WELCOME]: undefined;
  [WelcomeStackRouteNames.LOGIN]: undefined;
  [WelcomeStackRouteNames.SIGNUP]: undefined;
};
