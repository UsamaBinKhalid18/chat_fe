import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import SideBar from 'src/components/SideBar';
import SnackbarQueue from 'src/components/SnackbarQueue';
import TopNav from 'src/components/TopNav';
import usePersistedState from 'src/hooks/usePersistedState';
import useResponsive from 'src/hooks/useResponsive';

export default function DefaultLayout() {
  const { isSmallerScreen } = useResponsive();
  const [open, setOpen] = usePersistedState('sideMenuOpen', !isSmallerScreen);

  return (
    <Box display='flex' height='100vh'>
      <SnackbarQueue />
      <SideBar open={open} setOpen={setOpen} />
      <Box flexGrow={1}>
        <TopNav barOpen={open} setBarOpen={setOpen} />
        <Box height='calc(100vh - 64px)'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
