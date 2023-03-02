export const WelcomeStackRouteNames = {
  WELCOME: 'Welcome',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  SIGNUP_SUCCESS: 'SignupSuccess',
} as const;

export type WelcomeStackParamList = {
  [WelcomeStackRouteNames.WELCOME]: undefined;
  [WelcomeStackRouteNames.LOGIN]: undefined;
  [WelcomeStackRouteNames.SIGNUP]: undefined;
  [WelcomeStackRouteNames.SIGNUP_SUCCESS]: undefined;
};
