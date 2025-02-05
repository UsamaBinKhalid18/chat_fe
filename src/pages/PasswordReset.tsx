import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from 'src/apis/authApi';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import * as Yup from 'yup';

export default function PasswordReset() {
  const { uid, token } = useParams();
  const [success, setSuccess] = useState(false);
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await resetPassword({
          password: values.password,
          uid: uid ?? '',
          token: token ?? '',
        }).unwrap();
        setSuccess(true);
      } catch (e: any) {
        if (e.status) {
          utils.getErrorString(e);
          formik.setErrors({ password: utils.getErrorString(e) });
        }
      }
    },
  });
  return (
    <ColumnBox
      height='100vh'
      width='50%'
      maxWidth='450px'
      margin='auto'
      component='form'
      gap={3}
      onSubmit={formik.handleSubmit}
    >
      {success ? (
        <>
          <Typography variant='h4'>Password changed</Typography>
          <Button onClick={() => navigate('/')}>Return Home to Login</Button>
        </>
      ) : (
        <>
          <TextField
            label='New Password'
            fullWidth
            type='password'
            {...formik.getFieldProps('password')}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </>
      )}
    </ColumnBox>
  );
}
