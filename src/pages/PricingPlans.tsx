import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Box, Button, styled, Typography, useTheme } from '@mui/material';

import {
  useCancelSubscriptionMutation,
  useCreateStripeSessionMutation,
  useGetFreeRequestsQuery,
} from 'src/apis/paymentsApi';
import { subscriptionPlans } from 'src/common/constants';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import useResponsive from 'src/hooks/useResponsive';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { addNotification, setLoginModal } from 'src/redux/reducers/notificationSlice';
import { selectSubscription } from 'src/redux/reducers/subscriptionSlice';

import ChatifyProComparison from './Comparison';
import FAQs from './FAQs';

interface StatusProps {
  active: boolean;
}

const Status = styled(Typography)<StatusProps>`
  display: inline-block;
  color: ${({ active, theme }) => (active ? theme.palette.success.light : 'red')};
  border-radius: 8px;
  padding: 0px 4px;
  margin-left: 8px;
  font-size: 1rem;
  font-weight: 700;
  border: 2px solid ${({ active, theme }) => (active ? theme.palette.success.light : 'red')};
`;

export default function PricingPlans() {
  const subscription = useSelector(selectSubscription);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [createStripeSession] = useCreateStripeSessionMutation();
  const [cancelSubsciption, { isLoading }] = useCancelSubscriptionMutation();
  const { refetch } = useGetFreeRequestsQuery(undefined, { skip: true });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isSmallerScreen, isMobile } = useResponsive();

  if (searchParams.has('success')) {
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message:
          "Thank you for subscribing. If you don't see the changes, please wait for a few moments and refresh the page.",
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
      await cancelSubsciption({ id: subscription.id ?? 0 }).unwrap();
      refetch();
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: 'Subscription cancelled successfully',
          type: 'success',
        }),
      );
    } catch (e: any) {
      console.error(e);
      dispatch(
        addNotification({ id: new Date().getTime(), message: e.error.message, type: 'error' }),
      );
    }
  };

  return (
    <ColumnBox minHeight='100%' gap={4} mt={5} pb={2} width='90%' margin='auto'>
      <Box>
        <Typography textAlign='center' variant='h3' fontSize={40} fontWeight={700} color='dark'>
          Pricing Plans
        </Typography>
        <Typography color='textSecondary' textAlign='center'>
          Want to get more out of Chatify? Subscribe to one of our plans
        </Typography>
      </Box>
      {subscription.is_active && (
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
                <Typography variant='h4'>{subscription.package.name} </Typography>
                <Status active={subscription.is_active}>
                  {subscription.is_active ? 'Active' : 'Inactive'}
                </Status>
              </RowBox>
              <Typography color='textSecondary'>
                Renews on {utils.getDateString(subscription.current_period_end)}
              </Typography>
            </ColumnBox>
            <Button
              color='error'
              loading={isLoading}
              variant='outlined'
              onClick={() => unsubscribe()}
              sx={{
                marginLeft: 'auto',
                width: isMobile ? '100%' : 'fit-content',
                borderWidth: '2px',
                fontWeight: 700,
              }}
            >
              Cancel Subsciption
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
        flexDirection={isSmallerScreen ? 'column' : 'row'}
      >
        {subscriptionPlans.map((plan) => (
          <ColumnBox
            key={plan.name}
            p={2}
            gap={2}
            borderRadius='8px'
            justifyContent='start'
            sx={{
              bgcolor:
                plan.id == 2 && subscription.package.id != 2 ? '#ecf4ff' : 'background.paper',
            }}
            maxWidth={300}
            alignItems='start'
            position='relative'
            border={plan.id == 2 ? `2px solid #007bff` : 'none'}
          >
            {plan.id == 2 && (
              <Typography
                color='white'
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: '#007bff',
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
                  borderColor='success.light'
                  borderRadius='20px'
                  padding='1px 4px 0px 6px'
                >
                  Save {plan.discount}%
                </Typography>
              )}
            </RowBox>
            <RowBox gap={2}>
              <Typography variant='h4' fontWeight={700}>
                ${plan.price}
              </Typography>
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
              disabled={subscription.package?.id === plan.id}
              fullWidth
              onClick={() => {
                if (!user) {
                  dispatch(setLoginModal(true));
                } else {
                  createCheckout(plan.id);
                }
              }}
              sx={{
                fontWeight: 700,
                fontSize: '1rem',
                border: 'none',
                backgroundColor: 'background.onPaper',
                ':hover': {
                  filter: 'brightness(90%)',
                },
              }}
            >
              {subscription.package?.id === plan.id
                ? 'Current Plan'
                : (subscription.is_active ? 'Switch to ' : 'Select ') + plan.name}
            </Button>
            <Typography variant='caption' color='secondary'>
              {plan.description}
            </Typography>
          </ColumnBox>
        ))}
      </RowBox>
      <ChatifyProComparison />
      <FAQs />
    </ColumnBox>
  );
}
