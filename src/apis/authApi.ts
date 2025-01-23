import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: endpoints.LOGIN,
        method: 'POST',
        body: { email, password },
      }),
    }),
    googleLogin: builder.mutation({
      query: ({ accessToken }) => ({
        url: endpoints.LOGIN_WITH_GOOGLE,
        method: 'POST',
        body: { id_token: accessToken, access_token: accessToken },
      }),
    }),
    signup: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: endpoints.SIGNUP,
        method: 'POST',
        body: { email, password, first_name: firstName, last_name: lastName },
      }),
    }),
    requestPasswordReset: builder.mutation({
      query: ({ email }) => ({
        url: endpoints.REQUEST_PASSWORD_RESET,
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ uid, token, password }) => ({
        url: endpoints.RESET_PASSWORD(uid, token),
        method: 'POST',
        body: { password },
      }),
    }),
    resetPasswordEmail: builder.mutation({
      query: ({ uid, token }) => ({
        url: endpoints.RESET_PASSWORD(uid, token),
        method: 'GET',
      }),
    }),
    activateUser: builder.query({
      query: ({ uid, token }) => ({
        url: endpoints.ACTIVATE_USER(uid, token),
        method: 'GET',
      }),
    }),
    resendActivationEmail: builder.query({
      query: (id) => ({
        url: endpoints.RESEND_ACTIVATION_EMAIL(id),
        method: 'GET',
      }),
    }),
    sendVerificationEmail: builder.mutation({
      query: ({ email }) => ({
        url: endpoints.SEND_VERIFICATION_EMAIL,
        method: 'POST',
        body: { email },
      }),
    }),
    verifyEmail: builder.mutation<{ email: string }, { emailb64: string; token: string }>({
      query: ({ emailb64, token }) => ({
        url: endpoints.VERIFY_EMAIL,
        method: 'POST',
        body: { emailb64, token },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGoogleLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResetPasswordEmailMutation,
  useSendVerificationEmailMutation,
  useActivateUserQuery,
  useLazyResendActivationEmailQuery,
} = authApi;
