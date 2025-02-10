import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowUpward, Attachment, Send, Stop } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

import { useFormik } from 'formik';
import { addNotification } from 'src/redux/reducers/notificationSlice';

import RowBox from './common/RowBox';

export default function Input({
  onSubmit,
  isChat,
  isStreaming,
  handleStopStreaming,
  text,
}: {
  onSubmit: (message: string) => void;
  isChat?: boolean;
  isStreaming?: boolean;
  handleStopStreaming?: () => void;
  text?: string;
}) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      formik.setFieldValue('message', '');
      onSubmit(values.message);
    },
  });

  useEffect(() => {
    if (text) formik.setFieldValue('message', text);
  }, [text]);
  return (
    <RowBox
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      sx={{ backgroundColor: 'background.paper', borderRadius: 16 }}
      p={1}
      width={'100%'}
      gap={2}
    >
      <IconButton
        sx={{ width: 32, height: 32 }}
        onClick={() =>
          dispatch(
            addNotification({
              id: Date.now(),
              message: 'Attachment feature is not available yet and will be ready soon',
              type: 'info',
            }),
          )
        }
      >
        <Attachment />
      </IconButton>
      <TextField
        variant='outlined'
        autoComplete='off'
        fullWidth
        {...formik.getFieldProps('message')}
        slotProps={{
          input: { sx: { fontSize: '16px', padding: '0px' } },
          htmlInput: { style: { padding: '0px' } },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
      />
      <IconButton
        type={isStreaming ? 'button' : 'submit'}
        onClick={isStreaming ? handleStopStreaming : undefined}
        disabled={!isStreaming && !Boolean(formik.values.message)}
        sx={{
          width: 32,
          height: 32,
          backgroundColor: isChat ? 'white !important' : 'inherit',
          '&:disabled': {
            backgroundColor: isChat ? 'gray !important' : 'inherit',
          },
        }}
      >
        {isChat ? (
          isStreaming ? (
            <Stop htmlColor='#111' sx={{ width: 20, height: 20 }} />
          ) : (
            <ArrowUpward htmlColor='#111' sx={{ width: 20, height: 20 }} />
          )
        ) : (
          <Send />
        )}
      </IconButton>
    </RowBox>
  );
}
