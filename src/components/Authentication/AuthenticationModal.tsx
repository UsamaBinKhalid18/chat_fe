import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ColumnBox from '../common/ColumnBox';
import { useFormik } from 'formik';
import { errorCodes } from 'src/common/constants';
import { useEffect, useState } from 'react';
import { useGoogleLoginMutation, useLoginMutation } from 'src/apis/authApi';
import { utils } from 'src/common/utils';
import { loginSchema } from 'src/schema/login';
import { COLORS } from 'src/theme/colors';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Login from './Login';
import Signup from './Signup';

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
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setBackendError('');
    try {
      await googleLogin({ accessToken: credentialResponse!.credential }).unwrap();
      handleClose();
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    } finally {
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
        {isSignup ? <Signup handleClose={handleClose} /> : <Login handleClose={handleClose} />}
        <Button
          onClick={() => {
            setIsSignup((prev) => !prev);
          }}
          sx={{ ':hover': { background: 'none' }, mt: 1 }}
        >
          {isSignup ? 'Login' : 'Signup'}
        </Button>
        <Typography textAlign='center' mb={2}>
          OR
        </Typography>
        <GoogleLogin logo_alignment='center' width='350px' onSuccess={handleGoogleLogin} />
        {backendError && <Typography color='error'>{backendError}</Typography>}
      </Box>
    </Modal>
  );
}
