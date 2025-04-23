// import { Box, Modal } from '@mui/material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Close } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  keyframes,
  Link,
  Modal,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useCreateStripeSessionMutation } from 'src/apis/paymentsApi';
import { IMAGES } from 'src/assets/images';
import { SafePaymentSVG } from 'src/assets/images/svgs';
import { subscriptionPlans } from 'src/common/constants';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import {
  addNotification,
  selectUpgradePlanModal,
  setUpgradePlanModal,
} from 'src/redux/reducers/notificationSlice';
const style = (isSmallerScreen: boolean) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isSmallerScreen ? '100%' : 1100,
  height: isSmallerScreen ? '100%' : 'auto',
  bgcolor: 'transparent !important',
  border: 'none !important',
  outline: 'none ',
});

export default function UpgradePlan() {
  const isSmallerWidth = useMediaQuery('(max-width:1100px)');
  const isSmallerHeight = useMediaQuery('(max-height: 720px)');
  const isSmallerScreen = isSmallerWidth || isSmallerHeight;
  const [plan, setPlan] = useState(2);
  const [createStripeSession] = useCreateStripeSessionMutation();
  const open = useSelector(selectUpgradePlanModal);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await createStripeSession({ id: plan }).unwrap();
      window.location.href = response.checkout_page_url;
    } catch (e: any) {
      console.error(e);
      dispatch(
        addNotification({ id: new Date().getTime(), message: e.error.message, type: 'error' }),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    dispatch(setUpgradePlanModal(false));
  };
  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: 'scroll' }}>
      <Box sx={style(isSmallerScreen)}>
        <RowBox
          sx={{
            backgroundColor: 'white',
            width: '100%',
            borderRadius: isSmallerScreen ? 0 : '24px',
            m: isSmallerScreen ? 0 : 2,
            flexDirection: isSmallerScreen ? 'column-reverse' : 'row',
          }}
        >
          <ColumnBox
            flex={1}
            sx={{
              backgroundColor: '#F5F5F5',
              borderTopLeftRadius: isSmallerScreen ? 0 : '24px',
              borderBottomLeftRadius: isSmallerScreen ? 0 : '24px',
            }}
            p={6}
            px={4}
            gap={6}
            alignItems='stretch'
            alignSelf='stretch'
          >
            <Comparison />
            <Link href={'/pricing'} sx={{ alignSelf: 'center', color: '#007bff' }}>
              View all plans to learn more
            </Link>
          </ColumnBox>
          <ColumnBox flex={1} p={6} alignItems='stretch' gap={3.5} width='100%'>
            <Box position='absolute' top={6} right={6} p={2}>
              <IconButton onClick={handleClose}>
                <Close fontSize='small' />
              </IconButton>
            </Box>
            <ColumnBox gap={2} alignItems='stretch'>
              <RowBox gap={1}>
                <img src={IMAGES.logoLight} alt='logo' width={26} height={26} />
                <Typography variant='h6' fontWeight='bold'>
                  Chatify
                </Typography>
              </RowBox>
              <Typography fontSize={32} fontWeight='bold'>
                Upgrade your plan ✨
              </Typography>
            </ColumnBox>
            <TogglePlans value={plan} onChange={(id) => setPlan(id)} />
            <ContinueButton handleClick={handleClick} loading={loading} />
            <ColumnBox alignItems='center' gap={1.5}>
              <RowBox gap={1}>
                <SafePaymentSVG />
                <Typography fontSize={13} lineHeight={1.2}>
                  Pay Safe and Secure with
                </Typography>
              </RowBox>
              <Divider sx={{ alignSelf: 'stretch' }} />
              <RowBox gap={2}>
                <img src={IMAGES.paypal} alt='paypal' width={44} height={44} />
                <img src={IMAGES.visa} alt='visa' width={44} height={44} />
                <img src={IMAGES.mastercard} alt='mastercard' width={44} height={44} />
                <img src={IMAGES.discover} alt='discover' width={44} height={44} />
                <img src={IMAGES.americanExpress} alt='amex' width={44} height={44} />
                <img src={IMAGES.jcb} alt='jcb' width={44} height={44} />
              </RowBox>
            </ColumnBox>
          </ColumnBox>
        </RowBox>
      </Box>
    </Modal>
  );
}

const TogglePlans = ({ value, onChange }: { value: number; onChange: (id: number) => void }) => {
  const theme = useTheme();
  return (
    <ColumnBox gap={2} alignItems='stretch' justifyContent='start'>
      {subscriptionPlans.map((plan) => (
        <Button
          sx={{
            border:
              '3px solid ' + (value == plan.id ? '#007bff' : theme.palette.primary.contrastText),
            p: 2,
            px: 2.5,
            borderRadius: '16px',
          }}
          key={plan.id}
          onClick={() => onChange(plan.id)}
        >
          <RowBox width='100%'>
            <ColumnBox alignItems='stretch' flex={1} gap={0.5}>
              <RowBox gap={1}>
                <Typography
                  textAlign='start'
                  color='text.secondary'
                  fontSize={16}
                  fontWeight='bold'
                >
                  {plan.name}
                </Typography>
                {Boolean(plan.discount) && (
                  <Typography
                    sx={{
                      backgroundColor: plan.id == 2 ? '#ffebeb' : '#fff5e0',
                      borderRadius: '16px',
                      color: plan.id == 2 ? '#f14646' : '#eb9400',
                      fontWeight: 'bold',
                      px: 1,
                    }}
                  >
                    Save {plan.discount}%
                  </Typography>
                )}
              </RowBox>
              <Typography textAlign='start' color='text.disabled' fontSize={14} fontWeight='bold'>
                {Math.ceil(
                  plan.price *
                    (plan.frequency == 'monthly' ? 1 : plan.frequency == 'quarterly' ? 3 : 12),
                )}{' '}
                USD/{plan.per}
              </Typography>
            </ColumnBox>
            <RowBox gap={0.5} alignItems='end'>
              <Typography
                fontSize={value == plan.id ? 24 : 20}
                color={value == plan.id ? 'text.primary' : 'text.secondary'}
                fontWeight='1000'
                lineHeight={value == plan.id ? 1 : 1.2}
              >
                {(plan.price / 30).toFixed(2)} USD
              </Typography>
              <Typography>/day</Typography>
            </RowBox>
          </RowBox>
        </Button>
      ))}
    </ColumnBox>
  );
};

const features = [
  {
    icon: IMAGES.sparkles,
    title: 'DeepSeek R1, OpenAI GPT-4o, Claude, OpenAI o3-mini (High)',
    free: false,
    pro: true,
  },
  {
    icon: IMAGES.chat,
    title: 'Chat with PDF, docs, and more',
    free: false,
    pro: true,
  },

  {
    icon: IMAGES.infinity,
    title: 'Unlimited chats with all models',
    free: false,
    pro: true,
  },
  {
    icon: IMAGES.webSearch,
    title: 'Advanced web search',
    free: false,
    pro: true,
  },
  {
    icon: IMAGES.file,
    title: 'Unlimited file uploads',
    free: false,
    pro: true,
  },
];

const Comparison = () => {
  return (
    <ColumnBox gap={4} alignItems='stretch' justifyContent='center'>
      <RowBox gap={3}>
        <Typography fontSize={16} flex={1}>
          Supported Features
        </Typography>
        <RowBox minWidth='120px' justifyContent='space-between'>
          <Typography fontSize={16} fontWeight={700}>
            Free
          </Typography>
          <Typography fontSize={16} fontWeight={700}>
            Pro
          </Typography>
        </RowBox>
      </RowBox>
      <Divider />
      <ColumnBox gap={5} alignItems='stretch'>
        {features.map((feature) => (
          <RowBox key={feature.title} flex={1} gap={3} justifyContent='space-between'>
            <RowBox gap={1.5}>
              <img src={feature.icon} alt={feature.title} width={24} height={24} />
              <Typography>{feature.title}</Typography>
            </RowBox>
            <RowBox minWidth='120px' justifyContent='space-between'>
              {feature.free ? (
                <CheckCircleIcon htmlColor='#52c31c' />
              ) : (
                <CancelIcon htmlColor='#8a8a8a' />
              )}
              {feature.pro ? (
                <CheckCircleIcon htmlColor='#52c31c' />
              ) : (
                <CancelIcon htmlColor='#8a8a8a' />
              )}
            </RowBox>
          </RowBox>
        ))}
      </ColumnBox>
    </ColumnBox>
  );
};
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const MovingGradientButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  outline: 'none',
  padding: '0.5rem 1rem',
  height: '60px',
  width: '100%',
  borderRadius: '9999px',
  fontWeight: 'bold',
  fontSize: '24px',
  color: '#000',

  background: 'linear-gradient(270deg, #007BFF, #34C2DB, #007BFF)',
  backgroundSize: '600% 600%',
  animation: `${gradientAnimation} 8s ease infinite`,

  transition:
    'color 500ms, background-color 500ms, border-color 500ms, text-decoration-color 500ms, fill 500ms, stroke 500ms, box-shadow 500ms, outline-color 500ms, transform 500ms',
  transform: 'translateY(0)',
  position: 'relative',

  '&:active': {
    transform: 'translateY(0.0625rem)',
  },
  '&:disabled': {
    boxShadow: 'none',
    cursor: 'default',
    pointerEvents: 'none',
  },
}));

const StyledSvg = styled('svg')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(-1.5),
  top: theme.spacing(-1.5),
  display: 'none',

  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const ContinueButton = ({
  handleClick,
  loading,
}: {
  handleClick: () => void;
  loading: boolean;
}) => {
  return (
    <MovingGradientButton onClick={handleClick} variant='contained'>
      {loading ? <CircularProgress size={24} /> : 'Continue'}
      <StyledSvg width='22' height='30' viewBox='0 0 22 30' fill='none'>
        <path
          d='M19.066 27.563c-3.353-.633-6.688-1.208-9.986-2'
          stroke='url(#paint0_linear)'
          strokeWidth='4'
          strokeLinecap='round'
        />
        <path
          d='M16.402 13.37c-3.265 1.466-6.206 3.066-9.155 4.523'
          stroke='url(#paint1_linear)'
          strokeWidth='4'
          strokeLinecap='round'
        />
        <path
          d='M2.727 11.676A195.79 195.79 0 0 0 6 2.004'
          stroke='url(#paint2_linear)'
          strokeWidth='4'
          strokeLinecap='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear'
            x1='19.066'
            y1='27.563'
            x2='18.299'
            y2='23.721'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#007BFF' />
            <stop offset='1' stopColor='#34C2DB' />
          </linearGradient>
          <linearGradient
            id='paint1_linear'
            x1='16.906'
            y1='15.305'
            x2='15.171'
            y2='11.793'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#007BFF' />
            <stop offset='1' stopColor='#34C2DB' />
          </linearGradient>
          <linearGradient
            id='paint2_linear'
            x1='7.727'
            y1='3.016'
            x2='4.016'
            y2='1.759'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#007BFF' />
            <stop offset='1' stopColor='#34C2DB' />
          </linearGradient>
        </defs>
      </StyledSvg>
    </MovingGradientButton>
  );
};
