import { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useFormik } from 'formik';
import { useRequestPasswordResetMutation } from 'src/apis/authApi';
import ColumnBox from 'src/components/common/ColumnBox';
import * as Yup from 'yup';

export default function RequestPasswordReset() {
  const [resetPassword] = useRequestPasswordResetMutation();
  const [success, setSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({ email: values.email }).unwrap();
        setSuccess(true);
      } catch (e: any) {
        if (e.status) {
          formik.setErrors({ email: 'Email not found' });
        }
      }
    },
  });
  return (
    <Box component='form' onSubmit={formik.handleSubmit}>
      <ColumnBox height='100vh' width='50%' maxWidth='450px' margin='auto' gap={3}>
        {success ? (
          <Typography variant='h4'>Password reset email sent</Typography>
        ) : (
          <>
            <TextField
              label='Email'
              fullWidth
              {...formik.getFieldProps('email')}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </>
        )}
      </ColumnBox>
    </Box>
  );
}
