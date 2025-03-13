import React from 'react';

import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';

import { COLORS } from 'src/theme/colors';

interface SideBarItemProps {
  icon: React.ReactNode;
  title: string;
  collapsedTitle?: string;
  collapsed: boolean;
  onClick: () => void;
  isActive?: boolean;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>`
  flex-direction: ${({ collapsed }) => (collapsed ? 'column' : 'row')};
  gap: ${({ collapsed }) => (collapsed ? '0px' : '12px')};
  padding: ${({ collapsed }) => (collapsed ? '8px 12px' : '4px 12px')};
  width: 100%;
  height: ${({ collapsed }) => (collapsed ? '60px' : '44px')};
  color: white;
  border-radius: 8px;
  &:hover {
    background-color: ${COLORS.button.dark.hover};
  }
`;

export function SideBarItem({
  icon,
  title,
  collapsedTitle,
  onClick,
  collapsed,
  isActive,
}: SideBarItemProps) {
  return (
    <StyledListItemButton
      onClick={isActive ? () => {} : onClick}
      collapsed={collapsed}
      selected={isActive}
    >
      <ListItemIcon sx={{ minWidth: '18px', padding: collapsed ? '4px' : '0px' }}>
        {React.cloneElement(icon as React.ReactElement, {
          htmlColor: COLORS.sideBarIcon,
          sx: { width: '18px', height: '18px' },
        })}
      </ListItemIcon>
      <ListItemText
        primary={collapsed ? collapsedTitle || title : title}
        slotProps={{ primary: { fontSize: collapsed ? '12px' : '14px', fontWeight: 500 } }}
      />
    </StyledListItemButton>
  );
}
