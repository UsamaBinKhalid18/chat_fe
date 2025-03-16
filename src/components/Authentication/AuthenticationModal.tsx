import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Modal, Typography } from '@mui/material';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginMutation } from 'src/apis/authApi';
import { utils } from 'src/common/utils';
import { COLORS } from 'src/theme/colors';

import Login from './Login';
import Signup from './Signup';
import RowBox from '../common/RowBox';
import LoaderWithBackdrop from '../LoaderWithBackdrop';

interface AuthenticationModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: COLORS.gradient.start,
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
  borderRadius: 2,
};

export default function AuthenticationModal({ open, handleClose }: AuthenticationModalProps) {
  const [backendError, setBackendError] = useState<string>('');
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
      <Box sx={style}>
        <LoaderWithBackdrop isLoading={isLoading} />
        {isSignup ? <Signup handleClose={handleClose} /> : <Login handleClose={handleClose} />}
        <RowBox justifyContent='space-between'>
          <Button
            onClick={() => {
              setIsSignup((prev) => !prev);
            }}
            sx={{ ':hover': { background: 'none' }, mt: 1 }}
          >
            {isSignup ? 'Login' : 'Signup'}
          </Button>
          <Button
            onClick={() => {
              navigate('/password-reset');
              handleClose();
            }}
            sx={{ ':hover': { background: 'none' }, mt: 1 }}
          >
            Forgot Password?
          </Button>
        </RowBox>
        <Typography textAlign='center' mb={2}>
          OR
        </Typography>
        <GoogleLogin logo_alignment='center' width='350px' onSuccess={handleGoogleLogin} />
        {backendError && <Typography color='error'>{backendError}</Typography>}
      </Box>
    </Modal>
  );
}
