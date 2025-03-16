import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Add, KeyboardTab as Collapse, KeyboardArrowDown } from '@mui/icons-material';
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
import MuiDrawer from '@mui/material/Drawer';

import { IMAGES } from 'src/assets/images';
import {
  ChatSVG,
  ImageSVG,
  PricingSVG,
  SearchSVG,
  SupportSVG,
  TeamsSVG,
} from 'src/assets/images/svgs';
import useResponsive from 'src/hooks/useResponsive';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { COLORS } from 'src/theme/colors';

import ColumnBox from './common/ColumnBox';
import RowBox from './common/RowBox';
import { FeatureUpcoming } from './FeatureUpcoming';
import { SideBarItem } from './SideBarItem';
import { UserMenu } from './UserMenu';

const drawerWidth = 232;
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
  padding: '0 12px',
  ...theme.mixins.toolbar,
}));

export const StyledIconButton = styled(IconButton)`
  &:hover {
    background: ${COLORS.button.dark.hover};
  }
  border-radius: 8px;
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

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
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
}));

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
  border: 1px solid #666;
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
  border-radius: 12px;
  text-transform: none;
  font-size: 16px;
  display: flex;
  gap: 6px;
  padding: 8px 22px;
  min-height: 40px;
  margin-bottom: 6px;
`;

const MenuSubtitle = styled(Typography)`
  color: white;
  margin-top: 24px;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
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
  navigationUrl?: string;
  onClick?: () => void;
  isActive?: () => boolean;
};
const menuItems: MenuType[] = [
  {
    title: 'Tools',
    items: [
      {
        icon: <ChatSVG color='#b2b2b2' />,
        title: 'AI Chat',
        navigationUrl: '/',
        isActive: () => window.location.pathname === '/' || window.location.pathname === '/chat',
        collapsedTitle: 'Chat',
      },
      {
        icon: <ImageSVG color='#b2b2b2' />,
        title: 'Image Generation',
        collapsedTitle: 'Image',
      },
      {
        icon: <SearchSVG color='#b2b2b2' />,
        title: 'AI Search Engine',
        collapsedTitle: 'Search',
      },
    ],
  },
  {
    title: 'Others',
    items: [
      {
        icon: <TeamsSVG color='#b2b2b2' />,
        title: 'Invite Team',
        collapsedTitle: 'Teams',
      },
      {
        icon: <SupportSVG color='#b2b2b2' />,
        title: 'Support',
        navigationUrl: '/support',
      },
      {
        icon: <PricingSVG color='#b2b2b2' />,
        title: 'Pricing Plans',
        collapsedTitle: 'Pricing',
        navigationUrl: '/pricing',
      },
    ],
  },
];

export default function SideBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { isSmallerScreen } = useResponsive();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isFooterMenuOpen = Boolean(anchorEl);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [isFeatureUpcomingOpen, setIsFeatureUpcomingOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSmallerScreen) {
      setOpen(false);
    }
  }, []);

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
      <Drawer
        variant={isSmallerScreen ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true, // Improves performance on mobile
        }}
        sx={{
          height: '100vh',
          '& .MuiDrawer-paper': { borderWidth: 0 },
        }}
      >
        <DrawerHeader>
          <img src={IMAGES.logoGreen} style={{ maxWidth: 40, maxHeight: 40 }} />
          {open && (
            <>
              <Typography fontSize={16} fontWeight={500} color='white'>
                Chatify
              </Typography>

              <StyledIconButton onClick={() => setOpen(false)} sx={{ marginLeft: 'auto' }}>
                <Collapse htmlColor='#dadada' sx={{ rotate: '180deg' }} />
              </StyledIconButton>
            </>
          )}
        </DrawerHeader>
        <Box margin={open ? '12px' : '8px'} mt={1}>
          <StartNewButton
            variant='outlined'
            sx={{
              border: open ? 'default' : 'none',
              flexDirection: open ? 'row' : 'column',
              '&:hover': {
                backgroundColor: COLORS.button.dark.hover,
              },
            }}
            onClick={() => {
              navigate('/');
              if (isSmallerScreen) setOpen(false);
            }}
          >
            <Add htmlColor={COLORS.sideBarIcon} sx={{ height: 20, width: 20 }} />
            <Typography fontWeight={500} fontSize={open ? 14 : 12}>
              {open ? 'Start New' : 'New'}
            </Typography>
          </StartNewButton>
          <ColumnBox alignItems={open ? 'start' : 'center'} gap='4px'>
            {menuItems.map((menu) => (
              <>
                {open ? (
                  <MenuSubtitle fontWeight={500} key={menu.title}>
                    {menu.title}
                  </MenuSubtitle>
                ) : (
                  <Divider
                    key={menu.title}
                    sx={{ width: '58px', margin: '4px', borderColor: 'white' }}
                  />
                )}
                {menu.items.map((item) => (
                  <SideBarItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    collapsedTitle={item.collapsedTitle}
                    onClick={
                      item.navigationUrl
                        ? () => {
                            navigate(item.navigationUrl ?? '/');
                            if (isSmallerScreen) setOpen(false);
                          }
                        : item.onClick ??
                          (() => {
                            setSelectedFeature(item.title);
                            setIsFeatureUpcomingOpen(true);
                          })
                    }
                    collapsed={!open}
                    isActive={
                      item.isActive
                        ? item.isActive()
                        : item.navigationUrl
                        ? window.location.pathname === item.navigationUrl
                        : false
                    }
                  />
                ))}
              </>
            ))}
          </ColumnBox>
        </Box>
        <DrawerFooter>
          {user && (
            <>
              <UserMenu handleClose={handleClose} anchorEl={anchorEl} />
              <UserContainer onClick={handleClick}>
                <StyledAvatar
                  children={user.email.charAt(0).toUpperCase()}
                  src={user.picture ?? undefined}
                />
                {open && (
                  <>
                    <Typography variant='body2' color='white'>
                      {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
                    </Typography>

                    <FooterIconButton open={isFooterMenuOpen}>
                      <KeyboardArrowDown htmlColor='white' />
                    </FooterIconButton>
                  </>
                )}
              </UserContainer>
            </>
          )}
        </DrawerFooter>
      </Drawer>

      <FeatureUpcoming
        open={isFeatureUpcomingOpen}
        featureName={selectedFeature}
        onClose={() => setIsFeatureUpcomingOpen(false)}
      />
    </>
  );
}
