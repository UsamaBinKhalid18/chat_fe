import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import SideBar from 'src/components/SideBar';
import SnackbarQueue from 'src/components/SnackbarQueue';

export default function DefaultLayout() {
  return (
    <Box display='flex' height='100vh'>
      <SnackbarQueue />
      <SideBar />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
