import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, LinearProgress, styled, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Menu from '@mui/material/Menu';

import { setUpgradePlanModal } from 'src/redux/reducers/notificationSlice';
import { selectSubscription } from 'src/redux/reducers/subscriptionSlice';

import ColumnBox from './common/ColumnBox';
import RowBox from './common/RowBox';

interface UsageMenuProps {
  handleClose: (e: MouseEvent | TouchEvent | React.MouseEvent) => void;
  anchorEl: null | HTMLElement;
}

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    padding: 1rem;
    border-style: none;
    border-radius: 0.75rem;
    box-shadow: 0 0 #0000, 0 0 #0000, 0px 2px 24px 0px rgba(0, 0, 0, 0.1);
  }

  .MuiMenu-list {
    padding: 0px;
  }
`;

export function UsageMenu({ handleClose, anchorEl }: UsageMenuProps) {
  const plan = useSelector(selectSubscription);
  const dispatch = useDispatch();

  return (
    <ClickAwayListener onClickAway={(e) => handleClose(e)}>
      <StyledMenu
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          transform: 'translateY(8px)',
        }}
      >
        <ColumnBox alignItems='left'>
          <RowBox gap={1}>
            <svg width='10' height='14' viewBox='0 0 10 14' fill='none'>
              <path
                d='M4.995.332a3.17 3.17 0 0 0-3.167 3.167c0 1.713 1.34 3.1 3.087 3.16a.538.538 0 0 1 .146 0h.047a3.159 3.159 0 0 0 3.053-3.16A3.17 3.17 0 0 0 4.995.332ZM8.385 8.43c-1.86-1.24-4.894-1.24-6.767 0C.771 8.997.305 9.763.305 10.583c0 .82.466 1.58 1.306 2.14.934.627 2.16.94 3.387.94 1.227 0 2.453-.313 3.387-.94.84-.566 1.306-1.326 1.306-2.153-.006-.82-.466-1.58-1.306-2.14Z'
                fill='currentColor'
              ></path>
            </svg>
            <Typography fontSize={14}>
              {plan.is_active ? plan.package.name + ' Plan' : 'Free Plan'}
            </Typography>
          </RowBox>
          {plan.is_active ? (
            <>
              <Typography fontSize={16} mt={1.5}>
                You've got <span style={{ color: '#007bff' }}>unlimited</span> messages!
              </Typography>
              <Typography mt={1} fontSize={13} color='#616161'>
                Create and explore ideas with Chatify
              </Typography>
            </>
          ) : (
            <>
              <Typography mt={1.5} fontSize={20}>
                {plan.free_requests} daily prompts left
              </Typography>
              <Typography
                mt={1}
                fontSize={13}
                width='fit-content'
                color='#616161'
                sx={{
                  backgroundColor: '#ebebeb',
                  borderRadius: '50px',
                  px: 1,
                }}
              >
                Refills in 24 hours
              </Typography>
              <Typography mt={2} fontSize={13} color='#616161'>
                Create and explore ideas with Chatify
              </Typography>
              <LinearProgress
                sx={{
                  marginTop: '12px',
                  borderRadius: 5,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#eb9400',
                    borderRadius: 5,
                  },
                }}
                value={((3 - plan.free_requests) / 3) * 100}
                variant='determinate'
              />
              <Typography mt={0.5} mb={2} fontSize={13}>
                {3 - plan.free_requests} of 3 messages used
              </Typography>
              <Button
                startIcon={
                  <svg width='18' height='16' viewBox='0 0 18 16' fill='none'>
                    <path
                      d='m17.98 6.51-1.7 7.51a.69.69 0 0 1-.69.546H2.35a.69.69 0 0 1-.69-.546L.015 6.51a.69.69 0 0 1 .981-.767l4.035 1.955 3.344-5.914a.69.69 0 0 1 1.203 0l3.344 5.921 4.062-1.969a.691.691 0 0 1 .995.774Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                }
                variant='contained'
                sx={{ backgroundColor: '#007bff' }}
                onClick={(e) => {
                  dispatch(setUpgradePlanModal(true));
                  handleClose(e);
                }}
              >
                Unlock More
              </Button>
            </>
          )}
        </ColumnBox>
      </StyledMenu>
    </ClickAwayListener>
  );
}
