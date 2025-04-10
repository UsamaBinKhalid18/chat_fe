import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Start as Expand } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';

import { aiModels } from 'src/common/constants';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { selectModel, setModel } from 'src/redux/reducers/chatCompletionSlice';
import { selectLoginModal, setLoginModal } from 'src/redux/reducers/notificationSlice';

import AuthenticationModal from './Authentication/AuthenticationModal';
import ModelSelector from './ModelSelector';
import { StyledIconButton } from './SideBar';
const NavBar = styled(Box)`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 10px 12px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

export default function TopNav({
  barOpen,
  setBarOpen,
}: {
  barOpen: boolean;
  setBarOpen: (open: boolean) => void;
}) {
  const model = useSelector(selectModel);
  const authModalOpen = useSelector(selectLoginModal);
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const isHomeOrChat = location.pathname === '/' || location.pathname === '/chat';
  return (
    <NavBar>
      {!barOpen && (
        <StyledIconButton onClick={() => setBarOpen(true)}>
          <Expand />
        </StyledIconButton>
      )}
      {isHomeOrChat && (
        <ModelSelector
          models={aiModels}
          activeModel={model}
          onChange={(model) => dispatch(setModel(model))}
        />
      )}
      {!user && (
        <>
          <Button
            variant='contained'
            sx={{
              backgroundColor: '#007bff',
              color: 'white',
              marginLeft: 'auto',
              borderRadius: 20,
              height: '32px',
              minWidth: '50px',
            }}
            onClick={() => dispatch(setLoginModal(true))}
          >
            <Typography fontSize={14} fontWeight={700}>
              Login
            </Typography>
          </Button>
          <AuthenticationModal
            open={authModalOpen}
            handleClose={() => dispatch(setLoginModal(false))}
          />
        </>
      )}
    </NavBar>
  );
}
