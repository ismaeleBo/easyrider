export const WelcomeStackRouteNames = {
  WELCOME: 'Welcome',
  LOGIN: 'Login',
} as const;

export type WelcomeStackParamList = {
  [WelcomeStackRouteNames.WELCOME]: undefined;
  [WelcomeStackRouteNames.LOGIN]: undefined;
};
