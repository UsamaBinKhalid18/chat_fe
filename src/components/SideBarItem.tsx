import { ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import React from 'react';
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
  padding: 4px 12px;
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
        sx={{ color: 'white', fontSize: collapsed ? '12px !important' : '14px' }}
      />
    </StyledListItemButton>
  );
}
