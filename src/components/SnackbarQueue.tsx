import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { AlertProps } from '@mui/material/Alert';

import { removeNotificationById, selectNotifications } from 'src/redux/reducers/notificationSlice';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

// TODO Fix multiple notifications issue
const SnackbarQueue = () => {
  const dispatch = useDispatch();
  const queue = useSelector(selectNotifications);

  const handleClose = (id: number) => {
    dispatch(removeNotificationById(id));
  };

  if (queue.length === 0) return null;

  const { id, message, type, duration } = queue[0];

  return (
    <Snackbar
      open={true}
      autoHideDuration={duration}
      onClose={() => handleClose(id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={() => handleClose(id)} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarQueue;
