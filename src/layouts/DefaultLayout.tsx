import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/SideBar';

export default function DefaultLayout() {
  return (
    <Box display='flex' height='100vh'>
      <SideBar />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
