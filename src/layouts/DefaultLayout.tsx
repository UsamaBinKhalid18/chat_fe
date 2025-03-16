import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { useGetSubscriptionQuery } from 'src/apis/paymentsApi';
import SideBar from 'src/components/SideBar';
import SnackbarQueue from 'src/components/SnackbarQueue';
import TopNav from 'src/components/TopNav';
import usePersistedState from 'src/hooks/usePersistedState';
import useResponsive from 'src/hooks/useResponsive';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { selectSubscription } from 'src/redux/reducers/subscriptionSlice';

export default function DefaultLayout() {
  const { isSmallerScreen } = useResponsive();
  const [open, setOpen] = usePersistedState('sideMenuOpen', !isSmallerScreen);
  const { refetch } = useGetSubscriptionQuery();
  const user = useSelector(selectCurrentUser);
  const subscription = useSelector(selectSubscription);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch, subscription.id]);

  return (
    <Box display='flex' minHeight='100vh'>
      <SnackbarQueue />
      <SideBar open={open} setOpen={setOpen} />
      <Box flexGrow={1} display='flex' flexDirection='column'>
        <TopNav barOpen={open} setBarOpen={setOpen} />
        <Box minHeight='calc(100vh - 64px)'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
