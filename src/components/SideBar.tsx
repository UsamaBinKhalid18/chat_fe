import {
  Avatar,
  Box,
  Button,
  CSSObject,
  Divider,
  IconButton,
  styled,
  Theme,
  Typography,
} from '@mui/material';
import { GPT } from 'src/assets/svgs';
import usePersistedState from 'src/hooks/usePersistedState';
import MuiDrawer from '@mui/material/Drawer';
import {
  Add,
  KeyboardTab as Collapse,
  CreditCard,
  Start as Expand,
  Extension,
  Help,
  Image,
  KeyboardArrowDown,
  Message,
  MusicNote,
  TravelExplore,
} from '@mui/icons-material';
import { COLORS } from 'src/theme/colors';
import RowBox from './common/RowBox';
import { utils } from 'src/common/utils';
import { useState } from 'react';
import { UserMenu } from './UserMenu';
import ColumnBox from './common/ColumnBox';
import { SideBarItem } from './SideBarItem';
import { FeatureUpcoming } from './FeatureUpcoming';

const drawerWidth = 240;
const commonStyles = (): CSSObject => ({
  overflowX: 'hidden',
  backgroundImage: `linear-gradient(to right, ${COLORS.gradient.start}, ${COLORS.gradient.end})`,
});

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  ...commonStyles(),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
  ...commonStyles(),
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: ${COLORS.button.dark.hover};
  }
`;

const FooterIconButton = styled(StyledIconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>`
  padding: 0;
  margin-left: auto;
  & svg {
    transform: rotateX(${({ open }) => (open ? '180deg' : '0deg')});
    transition: transform 0.5s ease-in-out;
  }
`;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    margin: 0,
    padding: 0,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerFooter = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  flex: 1,
}));

const StyledAvatar = styled(Avatar)`
  width: 26px;
  height: 26px;
  font-size: 14px;
  background-color: aqua;
  color: black;
`;

const UserContainer = styled(RowBox)`
  padding: 12px;
  border: 1px solid ${COLORS.button.dark.hover};
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  background-color: ${COLORS.button.dark.background};
  margin: 16px;
  width: 100%;
  gap: 8px;
`;

const StartNewButton = styled(Button)`
  color: white;
  width: 100%;
  border-color: ${COLORS.sideBarIcon};
  border-radius: 12px;
  text-transform: none;
  font-size: 16px;
`;

const MenuSubtitle = styled(Typography)`
  color: white;
  margin-top: 30px;
  margin-bottom: 2px;
  font-size: 12px;
  padding-left: 8px;
`;

type MenuType = {
  title: string;
  items: MenuItemType[];
};

type MenuItemType = {
  icon: JSX.Element;
  title: string;
  collapsedTitle?: string;
  onClick?: () => void;
};
const menuItems: MenuType[] = [
  {
    title: 'Tools',
    items: [
      {
        icon: <Message htmlColor='white' />,
        title: 'AI Chat',
        collapsedTitle: 'Chat',
      },
      {
        icon: <TravelExplore htmlColor='white' />,
        title: 'AI Search Engine',
        collapsedTitle: 'Search',
      },
      {
        icon: <Image htmlColor='white' />,
        title: 'Image Generation',
        collapsedTitle: 'Image',
      },
      {
        icon: <MusicNote htmlColor='white' />,
        title: 'Music Generation',
        collapsedTitle: 'Music',
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        icon: <Extension htmlColor='white' />,
        title: 'Extension',
        collapsedTitle: 'Extension',
      },
      {
        icon: <Help htmlColor='white' />,
        title: 'Support',
      },
      {
        icon: <CreditCard htmlColor='white' />,
        title: 'Pricing Plans',
        collapsedTitle: 'Pricing',
      },
    ],
  },
];

export default function SideBar() {
  const [open, setOpen] = usePersistedState('sideMenuOpen', true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFooterMenuOpen = Boolean(anchorEl);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [isFeatureUpcomingOpen, setIsFeatureUpcomingOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleClose = (e: MouseEvent | TouchEvent | React.MouseEvent) => {
    setAnchorEl(null);
    e.stopPropagation();
  };
  return (
    <>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <GPT color='white' style={{ minWidth: 36, minHeight: 36 }} />
          {open && (
            <>
              <Typography variant='h6' color='white'>
                ChatApp
              </Typography>

              <StyledIconButton onClick={() => setOpen(false)} sx={{ marginLeft: 'auto' }}>
                <Collapse htmlColor='white' sx={{ rotate: '180deg' }} />
              </StyledIconButton>
            </>
          )}
        </DrawerHeader>
        <Box margin={open ? '20px' : '8px'}>
          <StartNewButton
            variant='outlined'
            sx={{
              border: open ? 'default' : 'none',
              display: 'flex',
              flexDirection: open ? 'row' : 'column',
            }}
          >
            <Add htmlColor={COLORS.sideBarIcon} />
            <Typography>{open ? 'Start New' : 'New'}</Typography>
          </StartNewButton>
          <ColumnBox alignItems={open ? 'start' : 'center'} gap='4px'>
            {menuItems.map((menu) => (
              <>
                {open ? (
                  <MenuSubtitle>{menu.title}</MenuSubtitle>
                ) : (
                  <Divider sx={{ width: '40px', margin: '14px', borderColor: 'white' }} />
                )}
                {menu.items.map((item) => (
                  <SideBarItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    collapsedTitle={item.collapsedTitle}
                    onClick={
                      item.onClick ??
                      (() => {
                        setSelectedFeature(item.title);
                        setIsFeatureUpcomingOpen(true);
                      })
                    }
                    collapsed={!open}
                  />
                ))}
              </>
            ))}
          </ColumnBox>
        </Box>
        <DrawerFooter>
          <UserMenu handleClose={handleClose} anchorEl={anchorEl} />
          <UserContainer onClick={handleClick}>
            <StyledAvatar children={utils.getInitials('Usama Bin Khalid')} />
            {open && (
              <>
                <Typography variant='body2' color='white'>
                  Usama Bin Khalid
                </Typography>

                <FooterIconButton open={isFooterMenuOpen}>
                  <KeyboardArrowDown htmlColor='white' />
                </FooterIconButton>
              </>
            )}
          </UserContainer>
        </DrawerFooter>
      </Drawer>
      {!open && (
        <StyledIconButton
          onClick={() => setOpen(true)}
          sx={{
            position: 'absolute',
            left: '86px',
            top: '10px',
          }}
        >
          <Expand htmlColor='white' />
        </StyledIconButton>
      )}
      <FeatureUpcoming
        open={isFeatureUpcomingOpen}
        featureName={selectedFeature}
        onClose={() => setIsFeatureUpcomingOpen(false)}
      />
    </>
  );
}
