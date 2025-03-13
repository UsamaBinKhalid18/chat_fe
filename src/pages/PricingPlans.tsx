import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, styled, Typography, useTheme } from '@mui/material';

import {
  useCancelSubscriptionMutation,
  useCreateStripeSessionMutation,
  useGetSubscriptionQuery,
} from 'src/apis/paymentsApi';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import useResponsive from 'src/hooks/useResponsive';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { addNotification, setLoginModal } from 'src/redux/reducers/notificationSlice';

interface StatusProps {
  active: boolean;
}

const Status = styled(Typography)<StatusProps>`
  display: inline-block;
  color: ${({ active, theme }) => (active ? theme.palette.success.dark : 'red')};
  border-radius: 4px;
  padding: 1px 8px;
  margin-left: 8px;
  border: 1px solid ${({ active, theme }) => (active ? theme.palette.success.dark : 'red')};
`;

type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  description: string;
  discount: number;
  previousPrice: number;
  frequency: string;
};
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 1,
    name: 'Monthly',
    price: 20,
    description: 'Get a taste of pro membership and enjoy unlimited chats for one month.',
    discount: 0,
    previousPrice: 0,
    frequency: 'monthly',
  },
  {
    id: 2,
    name: 'Quarterly',
    price: 15,
    description: 'Enjoy access to pro member features and unlimited chats for 3 months.',
    discount: 25,
    previousPrice: 20,
    frequency: 'quarterly',
  },
  {
    id: 3,
    name: 'Yearly',
    price: 7.5,
    description:
      'Get the best value for your money. Enjoy unlimited chats and pro member features for a year.',
    discount: 63,
    previousPrice: 20,
    frequency: 'yearly',
  },
];

export default function PricingPlans() {
  const { data, refetch } = useGetSubscriptionQuery();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [createStripeSession] = useCreateStripeSessionMutation();
  const [cancelSubsciption] = useCancelSubscriptionMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isSmallerScreen, isMobile } = useResponsive();

  if (searchParams.has('success')) {
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message: 'Payment successful. Thank you for subscribing',
        type: 'success',
      }),
    );
    navigate('/pricing');
  }

  if (searchParams.has('error')) {
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message: 'Payment failed. Please try again',
        type: 'error',
      }),
    );
    navigate('/pricing');
  }

  const createCheckout = async (id: number) => {
    try {
      const response = await createStripeSession({ id }).unwrap();
      window.location.href = response.checkout_page_url;
    } catch (e: any) {
      console.error(e);
      dispatch(
        addNotification({ id: new Date().getTime(), message: e.error.message, type: 'error' }),
      );
    }
  };

  const unsubscribe = async () => {
    try {
      await cancelSubsciption({ id: data?.package.id ?? 0 }).unwrap();
      refetch();
    } catch (e: any) {
      console.error(e);
      dispatch(
        addNotification({ id: new Date().getTime(), message: e.error.message, type: 'error' }),
      );
    }
  };

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, dispatch]);

  return (
    <ColumnBox minHeight='100%' gap={4} mt={5} pb={2} width='90%' margin='auto'>
      <Box>
        <Typography textAlign='center' variant='h3'>
          Pricing Plans
        </Typography>
        <Typography color='textSecondary'>
          Want to get more out of chatify? Subscribe to one of our plans
        </Typography>
      </Box>
      {data?.is_active && (
        <ColumnBox
          p={2}
          borderRadius='8px'
          alignItems='start'
          maxWidth={isMobile ? 300 : 800}
          width={isSmallerScreen ? '90%' : '80%'}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Typography>Current Plan</Typography>
          <RowBox width='100%' justifyContent='start' gap={2} flexWrap='wrap'>
            <ColumnBox alignItems='start'>
              <RowBox>
                <Typography variant='h4'>{data.package.name} </Typography>
                <Status active={data.is_active}>{data.is_active ? 'Active' : 'Inactive'}</Status>
              </RowBox>
              <Typography color='textSecondary'>
                Renews on {utils.getDateString(data.current_period_end)}
              </Typography>
            </ColumnBox>
            <Button
              color='error'
              variant='outlined'
              onClick={() => unsubscribe()}
              sx={{ marginLeft: 'auto', width: isMobile ? '100%' : 'fit-content' }}
            >
              CancelSubsciption
            </Button>
          </RowBox>
        </ColumnBox>
      )}
      <RowBox
        gap={4}
        justifyContent='center'
        alignItems='stretch'
        width='90%'
        flexWrap='wrap'
        maxWidth={1000}
      >
        {subscriptionPlans.map((plan) => (
          <ColumnBox
            key={plan.name}
            p={2}
            gap={2}
            borderRadius='8px'
            justifyContent='start'
            sx={{ bgcolor: 'background.paper' }}
            maxWidth={300}
            alignItems='start'
            position='relative'
            border={plan.id == 2 ? `2px solid ${theme.palette.success.dark}` : 'none'}
          >
            {plan.id == 2 && (
              <Typography
                color='white'
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: theme.palette.success.dark,
                  px: 2.5,
                  py: '1px',
                  borderRadius: '20px',
                }}
              >
                Popular
              </Typography>
            )}
            <RowBox justifyContent='space-between' width='100%' flexWrap={'wrap'}>
              <Typography variant='h5'>{plan.name}</Typography>
              {plan.discount > 0 && (
                <Typography
                  color='secondary'
                  border='2px solid'
                  borderColor='success.dark'
                  borderRadius='20px'
                  padding='1px 4px 0px 6px'
                >
                  Save {plan.discount}%
                </Typography>
              )}
            </RowBox>
            <RowBox gap={2}>
              <Typography variant='h4'>${plan.price}</Typography>
              {plan.discount > 0 && (
                <Typography variant='h5' color='secondary' sx={{ textDecoration: 'line-through' }}>
                  ${plan.previousPrice}
                </Typography>
              )}
            </RowBox>
            <Typography color='secondary'>per month, paid {plan.frequency}</Typography>
            <Button
              variant='outlined'
              color='inherit'
              disabled={data?.package?.id === plan.id}
              fullWidth
              onClick={() => {
                if (!user) {
                  dispatch(setLoginModal(true));
                } else {
                  createCheckout(plan.id);
                }
              }}
              sx={{ fontWeight: 700, fontSize: '1rem' }}
            >
              {data?.package?.id === plan.id
                ? 'Current Plan'
                : (data?.is_active ? 'Switch to ' : 'Select ') + plan.name}
            </Button>
            <Typography variant='caption' color='secondary'>
              {plan.description}
            </Typography>
          </ColumnBox>
        ))}
      </RowBox>
    </ColumnBox>
  );
}
