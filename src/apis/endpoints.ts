const USERS = 'api/v1/users';
const PAYMENTS = 'api/v1/payments';

export const endpoints = {
  LOGIN: `${USERS}/login/`,
  LOGIN_WITH_GOOGLE: `${USERS}/google/`,
  SIGNUP: `${USERS}/signup/`,
  REQUEST_PASSWORD_RESET: `${USERS}/reset-password/`,
  RESET_PASSWORD: (uid: string, token: string) => `${USERS}/reset-password/${uid}/${token}/`,
  ACTIVATE_USER: (uid: string, token: string) => `${USERS}/activate/${uid}/${token}/`,
  RESEND_ACTIVATION_EMAIL: (id: string) => `${USERS}/resend-activation-email/${id}/`,
  SEND_VERIFICATION_EMAIL: `${USERS}/send-verification-email/`,
  VERIFY_EMAIL: `${USERS}/verify-email/`,
  REFRESH_TOKEN: (userId: number) => `${USERS}/${userId}/refresh-token/`,

  SUBSCRIPTION: `${PAYMENTS}/subscription/`,
  CHECKOUT: `${PAYMENTS}/checkout/`,
} as const;
