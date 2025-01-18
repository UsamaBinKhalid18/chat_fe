import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, Typography } from '@mui/material';
import { COLORS } from 'src/theme/COLORS';
import { Logout, Settings } from '@mui/icons-material';

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
        <StyledMenuItem onClick={handleClose}>
          <Logout htmlColor='white' />
          <Typography color='white'>Logout</Typography>
        </StyledMenuItem>
      </StyledMenu>
    </ClickAwayListener>
  );
}
