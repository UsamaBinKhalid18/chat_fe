const USERS = 'api/v1/users';

export const endpoints = {
  LOGIN: `${USERS}/login/`,
  LOGIN_WITH_GOOGLE: `${USERS}/google/`,
  SIGNUP: `${USERS}/signup/`,
  REQUEST_PASSWORD_RESET: `${USERS}/request-password-reset`,
  RESET_PASSWORD: (uid: string, token: string) => `${USERS}/reset-password/${uid}/${token}`,
  ACTIVATE_USER: (uid: string, token: string) => `${USERS}/activate/${uid}/${token}`,
  RESEND_ACTIVATION_EMAIL: (id: string) => `${USERS}/resend-activation-email/${id}`,
  SEND_VERIFICATION_EMAIL: `${USERS}/send-verification-email`,
  VERIFY_EMAIL: `${USERS}/verify-email/`,
  REFRESH_TOKEN: (userId: number) => `${USERS}/refresh-token/${userId}`,
} as const;
