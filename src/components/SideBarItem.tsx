import React from 'react';

import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';

import { COLORS } from 'src/theme/colors';

interface SideBarItemProps {
  icon: React.ReactNode;
  title: string;
  collapsedTitle?: string;
  collapsed: boolean;
  onClick: () => void;
}

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>`
  flex-direction: ${({ collapsed }) => (collapsed ? 'column' : 'row')};
  gap: ${({ collapsed }) => (collapsed ? '0px' : '12px')};
  padding: ${({ collapsed }) => (collapsed ? '8px 10px' : '4px 10px')};
  width: 100%;
  color: white;
  border-radius: 8px;
  &:hover {
    background-color: ${COLORS.button.dark.hover};
  }
`;

export function SideBarItem({ icon, title, collapsedTitle, onClick, collapsed }: SideBarItemProps) {
  return (
    <StyledListItemButton onClick={onClick} collapsed={collapsed}>
      <ListItemIcon sx={{ minWidth: '18px' }}>
        {React.cloneElement(icon as React.ReactElement, {
          htmlColor: COLORS.sideBarIcon,
          sx: { width: '18px', height: '18px' },
        })}
      </ListItemIcon>
      <ListItemText
        primary={collapsed ? collapsedTitle || title : title}
        sx={{ marginBottom: 0 }}
        slotProps={{ primary: { variant: 'caption' } }}
      />
    </StyledListItemButton>
  );
}
