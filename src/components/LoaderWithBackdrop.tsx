import { Backdrop, CircularProgress, Typography } from '@mui/material';

import ColumnBox from './common/ColumnBox';

const LoaderWithBackdrop = ({ isLoading, message }: { isLoading: boolean; message?: string }) => {
  return (
    <>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <ColumnBox gap={4}>
          {message && (
            <Typography color='white' variant='h1'>
              {message}
            </Typography>
          )}
          <CircularProgress color='inherit' />
        </ColumnBox>
      </Backdrop>
    </>
  );
};

export default LoaderWithBackdrop;
