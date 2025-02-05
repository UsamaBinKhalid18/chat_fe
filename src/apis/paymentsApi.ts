import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';

export type Subscription = {
  id: number;
  current_period_end: string;
  is_active: boolean;
  package: {
    id: number;
    name: string;
  };
};

export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<Subscription, void>({
      query: () => ({
        url: endpoints.SUBSCRIPTION,
      }),
    }),
    createStripeSession: builder.mutation<{ checkout_page_url: string }, { id: number }>({
      query: ({ id }) => ({
        url: endpoints.CHECKOUT,
        method: 'POST',
        body: { package_id: id, mode: 'subscription' },
      }),
    }),
    cancelSubscription: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: endpoints.SUBSCRIPTION,
        method: 'POST',
        body: { subscription_id: id },
      }),
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateStripeSessionMutation,
  useCancelSubscriptionMutation,
} = paymentsApi;
