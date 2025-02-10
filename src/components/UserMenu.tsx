import React from 'react';

import { Logout, Settings } from '@mui/icons-material';
import { styled, Typography } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useLogout } from 'src/hooks/useLogout';
import { COLORS } from 'src/theme/COLORS';



interface UserMenuProps {
  handleClose: (e: MouseEvent | TouchEvent | React.MouseEvent) => void;
  anchorEl: null | HTMLElement;
}

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    width: 208px;
    background-image: linear-gradient(to right, ${COLORS.gradient.start}, ${COLORS.gradient.end});
    transform: translateY(-8px) !important;
    border-radius: 8px;
    border: 1px solid ${COLORS.button.dark.hover};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  color: white;
  display: flex;
  gap: 16px;
  padding: 8px 16px;
  &:hover {
    background: ${COLORS.button.dark.hover};
  }
`;

export function UserMenu({ handleClose, anchorEl }: UserMenuProps) {
  const isFooterMenuOpen = Boolean(anchorEl);
  const logout = useLogout();
  return (
    <ClickAwayListener onClickAway={(e) => handleClose(e)}>
      <StyledMenu
        open={isFooterMenuOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <StyledMenuItem onClick={handleClose}>
          <Settings htmlColor='white' />
          <Typography color='white'>Settings</Typography>
        </StyledMenuItem>
        <StyledMenuItem
          onClick={(e) => {
            logout();
            handleClose(e);
          }}
        >
          <Logout htmlColor='white' />
          <Typography color='white'>Logout</Typography>
        </StyledMenuItem>
      </StyledMenu>
    </ClickAwayListener>
  );
}
