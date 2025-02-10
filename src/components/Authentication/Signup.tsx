import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useFormik } from 'formik';
import { useSignupMutation } from 'src/apis/authApi';
import { errorCodes } from 'src/common/constants';
import { utils } from 'src/common/utils';
import { addNotification } from 'src/redux/reducers/notificationSlice';
import { signupSchema } from 'src/schema/login';

import ColumnBox from '../common/ColumnBox';

interface SignupModalProps {
  handleClose: () => void;
}

export default function Signup({ handleClose }: SignupModalProps) {
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  const [backendError, setBackendError] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (formData) => {
      setBackendError('');
      try {
        await signup(formData).unwrap();
        handleClose();
        dispatch(
          addNotification({
            message: 'Signup successful, To continue check your email.',
            type: 'success',
            id: new Date().getTime(),
            duration: 5000,
          }),
        );
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
          label='First Name'
          fullWidth
          variant='outlined'
          {...formik.getFieldProps('firstName')}
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          label='Last Name'
          fullWidth
          variant='outlined'
          {...formik.getFieldProps('lastName')}
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
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
          Signup
        </Button>
      </ColumnBox>
    </Box>
  );
}
