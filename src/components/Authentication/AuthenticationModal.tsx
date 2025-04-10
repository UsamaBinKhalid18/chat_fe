import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Close } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Modal, Typography, useMediaQuery } from '@mui/material';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from 'src/apis/authApi';
import { StarSVG } from 'src/assets/images/svgs';
import { utils } from 'src/common/utils';

import Login from './Login';
import Signup from './Signup';
import ColumnBox from '../common/ColumnBox';
import RowBox from '../common/RowBox';
import LoaderWithBackdrop from '../LoaderWithBackdrop';
import BrowserIcons from './BrowserIcons';
import ReviewsCarousel from './ReviewsCarousel';

interface AuthenticationModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 1000,

  bgcolor: 'transparent !important',
  border: 'none !important',
  outline: 'none ',

  p: 2,
};

export default function AuthenticationModal({ open, handleClose }: AuthenticationModalProps) {
  const [backendError, setBackendError] = useState<string>('');
  const isSmallerScreen = useMediaQuery('(max-width:1100px)');
  const [isSignup, setIsSignup] = useState(false);
  const [googleLogin] = useGoogleLoginMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setBackendError('');
    try {
      setIsLoading(true);
      await googleLogin({ accessToken: credentialResponse!.credential }).unwrap();
      handleClose();
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setBackendError('');
      setIsSignup(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{ ...style, width: isSmallerScreen ? 'auto' : '80%', padding: isSmallerScreen ? 4 : 0 }}
      >
        <LoaderWithBackdrop isLoading={isLoading} />

        <RowBox alignItems='stretch'>
          {!isSmallerScreen && (
            <ColumnBox
              flex={1}
              gap={4}
              pl={2}
              py={4}
              sx={{
                backgroundColor: '#fafafa',
                borderTopLeftRadius: 24,
                borderBottomLeftRadius: 24,
              }}
            >
              <RowBox gap={4} alignItems='start'>
                <svg width='45' height='126' viewBox='0 0 45 126' fill='none' color='#d6d6d6'>
                  <path
                    id='Vector'
                    d='m3.076 85.749.011.012c-.258 4.142 7.375 21.992 18.746 16.26a71.751 71.751 0 0 0 3.559 6.065c-.607-.307-1.213-.602-1.83-.833-5.478-2.103-10.058.654-10.978 1.513a1.874 1.874 0 0 0-.573 1.295v.051c0 .039.012.09.012.129h.01c.394 1.961 6.32 10.156 12.259 11.361.651.128 1.302.192 1.942.192 2.683 0 5.22-1.167 7.364-3.398 2.75 2.808 5.68 5.309 8.79 7.386.224.141.46.218.706.218.483 0 .955-.295 1.213-.795.392-.769.168-1.757-.506-2.193-3.008-2-5.837-4.424-8.474-7.155 1.032-2.231 2.413-6.399 2.222-10.874-.135-2.526-.763-6.642-3.098-11.95l-.068-.155c-.213-.59-.718-1.013-1.302-1.013-.359 0-.673.141-.92.385-1.56 1.346-5.007 5-5.119 11.092-.011.705.045 1.397.124 2.09a70.129 70.129 0 0 1-2.997-5.193c5.365-6.014 6.117-13.85 4.759-22.338l-.034-.192c-.056-.513-.314-.975-.718-1.231a1.26 1.26 0 0 0-1.257-.064c-3.817 1.628-6.5 4.77-7.633 8.86-.191.693-.315 1.398-.405 2.103a74.058 74.058 0 0 1-1.639-6.283c1.898-1.09 5.063-3.526 7.028-7.514 1.088-2.206 2.48-6.091 3.02-12.13l.022-.244H27.3c.034-.154.034-.257.034-.27 0-.628-.325-1.205-.83-1.461a1.266 1.266 0 0 0-.775-.129c-4.041.231-7.375 2.257-9.474 5.732a14.864 14.864 0 0 0-.876 1.77 86.72 86.72 0 0 1-.022-6.617c2.054-.32 5.612-1.41 8.509-4.578 2.267-2.5 4.22-6.026 5.814-10.514l.079-.205a1.83 1.83 0 0 0-.056-1.603 1.452 1.452 0 0 0-.977-.731c-3.929-1.167-7.588-.436-10.406 2.064-.46.398-.875.872-1.268 1.36.438-2.155.954-4.27 1.55-6.36.796.191 1.829.346 3.019.346 1.84 0 4.03-.372 6.174-1.59 2.772-1.578 5.489-4.258 8.093-7.976l.112-.167c.326-.385.472-.923.37-1.475a1.597 1.597 0 0 0-.762-1.102c-3.469-2.437-7.117-3.027-10.35-1.719-.606.244-1.179.59-1.729.962a63.286 63.286 0 0 1 3.424-6.052c2.47-1.077 6.623-3.219 10.08-6.86 1.819-1.95 4.524-5.502 7.162-11.336l.09-.193a1.802 1.802 0 0 0-.068-1.795C43.836.13 43.32.08 43.072.053c-.696-.09-6.982-.602-12.292 4.873-4.535 4.706-5.87 11.336-6.072 14.028a69.503 69.503 0 0 0-3.38 5.912c.034-.718.068-1.436.057-2.142v-.013c-.068-5.95-2.301-10.784-3.637-12.643-.27-.628-.887-1-1.527-.86-1.65.36-6.297 10.964-5.579 18.492.54 6.014 3.48 9.245 5.377 10.732a87.252 87.252 0 0 0-1.706 6.9 36.263 36.263 0 0 0-.505-2.194c-1.617-5.872-5.175-9.488-6.836-10.591-.438-.41-1.055-.487-1.572-.167-1.481.923-3.21 12.913-.662 19.62 1.538 4.102 4.355 6.95 7.824 8.014a89.23 89.23 0 0 0 .034 7.347c-.326-.628-.64-1.27-1-1.872-3.681-6.078-8.935-7.322-9.71-7.322h-.022c-.09 0-.18.013-.27.038-.28.077-.55.244-.751.513-.023.013-.034.039-.045.064-.034.052-.079.116-.112.18l.022.013c-.74 2.167.438 13.233 4.479 18.478 2.279 2.975 5.23 4.539 8.453 4.539.291 0 .595-.013.898-.038a77.214 77.214 0 0 0 1.863 6.988c-.46-.474-.932-.936-1.414-1.36-4.895-4.27-10.17-3.359-11.001-3.013-.078.039-.146.077-.213.116a1.624 1.624 0 0 0-.651.872c-.012.013-.012.038-.012.064a.263.263 0 0 0-.034.128Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <ColumnBox gap={0.5}>
                  <Typography fontSize={24} fontWeight={700}>
                    #1
                  </Typography>
                  <Typography fontSize={14}>AI Assistant</Typography>
                  <RowBox color='#ffa71a'>
                    <StarSVG />
                    <StarSVG />
                    <StarSVG />
                    <StarSVG />
                    <StarSVG />
                  </RowBox>
                  <Typography fontSize={28} fontWeight={600}>
                    30M+ users
                  </Typography>
                  <Typography fontSize={14}>100K+ ratings </Typography>
                </ColumnBox>
                <svg width='45' height='126' viewBox='0 0 45 126' fill='none' color='#d6d6d6'>
                  <path
                    id='Vector'
                    d='m41.924 85.749-.011.012c.258 4.142-7.375 21.992-18.746 16.26a71.751 71.751 0 0 1-3.559 6.065c.607-.307 1.213-.602 1.83-.833 5.478-2.103 10.058.654 10.978 1.513.337.308.562.808.573 1.295v.051c0 .039-.012.09-.012.129h-.01c-.394 1.961-6.32 10.156-12.259 11.361-.651.128-1.302.192-1.942.192-2.683 0-5.22-1.167-7.364-3.398-2.75 2.808-5.68 5.309-8.79 7.386-.224.141-.46.218-.706.218-.483 0-.955-.295-1.213-.795-.393-.769-.168-1.757.506-2.193 3.008-2 5.837-4.424 8.475-7.155-1.033-2.231-2.414-6.399-2.223-10.874.135-2.526.763-6.642 3.098-11.95l.068-.155c.213-.59.718-1.013 1.302-1.013.359 0 .673.141.92.385 1.56 1.346 5.007 5 5.119 11.092.011.705-.045 1.397-.124 2.09a70.129 70.129 0 0 0 2.997-5.193c-5.365-6.014-6.117-13.85-4.759-22.338l.034-.192c.056-.513.314-.975.718-1.231a1.26 1.26 0 0 1 1.257-.064c3.817 1.628 6.5 4.77 7.633 8.86.191.693.315 1.398.405 2.103a74.058 74.058 0 0 0 1.639-6.283c-1.898-1.09-5.063-3.526-7.028-7.514-1.088-2.206-2.48-6.091-3.02-12.13l-.022-.244h.012c-.034-.154-.034-.257-.034-.27 0-.628.325-1.205.83-1.461.248-.129.517-.167.775-.129 4.041.231 7.375 2.257 9.474 5.732.337.564.617 1.167.876 1.77a86.72 86.72 0 0 0 .022-6.617c-2.054-.32-5.612-1.41-8.509-4.578-2.267-2.5-4.22-6.026-5.814-10.514l-.079-.205a1.83 1.83 0 0 1 .056-1.603c.225-.398.584-.654.977-.731 3.929-1.167 7.588-.436 10.406 2.064.46.398.875.872 1.268 1.36a85.089 85.089 0 0 0-1.55-6.36c-.796.191-1.829.346-3.019.346-1.84 0-4.03-.372-6.174-1.59-2.772-1.578-5.489-4.258-8.093-7.976L9 30.277a1.781 1.781 0 0 1-.37-1.475c.089-.487.38-.884.763-1.102 3.468-2.437 7.116-3.027 10.35-1.719.605.244 1.178.59 1.728.962a63.286 63.286 0 0 0-3.424-6.052c-2.47-1.077-6.623-3.219-10.08-6.86C6.148 12.08 3.443 8.528.805 2.694l-.09-.193A1.802 1.802 0 0 1 .783.707C1.164.13 1.68.08 1.928.053c.696-.09 6.982-.602 12.292 4.873 4.534 4.706 5.87 11.336 6.072 14.028a69.503 69.503 0 0 1 3.38 5.912c-.034-.718-.068-1.436-.057-2.142v-.013c.068-5.95 2.301-10.784 3.637-12.643.27-.628.887-1 1.527-.86 1.65.36 6.297 10.964 5.579 18.492-.54 6.014-3.48 9.245-5.377 10.732a87.252 87.252 0 0 1 1.706 6.9c.146-.732.314-1.476.505-2.194 1.617-5.872 5.175-9.488 6.836-10.591.438-.41 1.056-.487 1.572-.167 1.481.923 3.21 12.913.662 19.62-1.538 4.102-4.355 6.95-7.824 8.014a89.23 89.23 0 0 1-.034 7.347c.326-.628.64-1.27 1-1.872 3.681-6.078 8.935-7.322 9.71-7.322h.022c.09 0 .18.013.27.038.28.077.55.244.751.513.023.013.034.039.045.064.034.052.079.116.112.18l-.022.013c.74 2.167-.438 13.233-4.479 18.478-2.279 2.975-5.23 4.539-8.453 4.539-.291 0-.595-.013-.898-.038a77.214 77.214 0 0 1-1.863 6.988c.46-.474.932-.936 1.414-1.36 4.894-4.27 10.17-3.359 11.001-3.013.078.039.146.077.213.116.292.192.528.487.652.872.01.013.01.038.01.064.024.038.035.09.035.128Z'
                    fill='currentColor'
                  ></path>
                </svg>
              </RowBox>

              <ColumnBox gap={2}>
                <Typography fontSize={24} fontWeight={700}>
                  Available on
                </Typography>
                <BrowserIcons />
              </ColumnBox>
              <ColumnBox gap={3}>
                <Typography fontSize={24} fontWeight={700}>
                  Trusted by Millions
                </Typography>
                <Box>
                  <ReviewsCarousel />
                </Box>
              </ColumnBox>
            </ColumnBox>
          )}
          <ColumnBox
            width={360}
            alignItems='stretch'
            gap={2}
            position='relative'
            p={2}
            sx={{
              backgroundColor: 'white',
              borderRadius: '24px',
              borderTopLeftRadius: isSmallerScreen ? 24 : 0,
              borderBottomLeftRadius: isSmallerScreen ? 24 : 0,
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 6,
                top: 6,
              }}
            >
              <Close fontSize='small' />
            </IconButton>
            <Typography fontSize={28} fontWeight={700} lineHeight={1.1}>
              Join Millions of Happy Users
            </Typography>
            <Typography fontSize={13} fontWeight={400} color='text.secondary'>
              You must login to proceed. Your data is safe and you won't receive any spam.
            </Typography>
            <GoogleLogin logo_alignment='center' width='328px' onSuccess={handleGoogleLogin} />
            <Divider>OR</Divider>
            {isSignup ? <Signup handleClose={handleClose} /> : <Login handleClose={handleClose} />}
            <RowBox justifyContent='space-between' mt={-1}>
              <Button
                onClick={() => {
                  setIsSignup((prev) => !prev);
                }}
                sx={{ ':hover': { background: 'none' } }}
              >
                {isSignup ? 'Login' : 'Signup'}
              </Button>
              <Button
                onClick={() => {
                  navigate('/password-reset');
                  handleClose();
                }}
                sx={{ ':hover': { background: 'none' } }}
              >
                Forgot Password?
              </Button>
            </RowBox>
            {backendError && <Typography color='error'>{backendError}</Typography>}
          </ColumnBox>
        </RowBox>
      </Box>
    </Modal>
  );
}
