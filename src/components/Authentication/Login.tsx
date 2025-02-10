import { useEffect, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useFormik } from 'formik';
import { useLoginMutation } from 'src/apis/authApi';
import { errorCodes } from 'src/common/constants';
import { utils } from 'src/common/utils';
import { loginSchema } from 'src/schema/login';

import ColumnBox from '../common/ColumnBox';

interface LoginModalProps {
  handleClose: () => void;
}

export default function Login({ handleClose }: LoginModalProps) {
  const [login] = useLoginMutation();

  const [backendError, setBackendError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (formData) => {
      setBackendError('');
      try {
        await login(formData).unwrap();
        handleClose();
      } catch (error: any) {
        if (error.status == errorCodes.UNAUTHORIZED_CODE) {
          setBackendError('Incorrect email or password');
        } else {
          setBackendError(utils.getErrorString(error));
        }
      }
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
      setBackendError('');
    };
  }, []);

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate>
      <ColumnBox gap={2}>
        <TextField
          label='Email'
          fullWidth
          variant='outlined'
          {...formik.getFieldProps('email')}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label='Password'
          fullWidth
          type='password'
          variant='outlined'
          {...formik.getFieldProps('password')}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {backendError && <Typography color='error'>{backendError}</Typography>}
        <Button
          type='submit'
          fullWidth
          loading={formik.isSubmitting}
          variant='contained'
          sx={{ bgcolor: '#2727e3', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Login
        </Button>
      </ColumnBox>
    </Box>
  );
}
