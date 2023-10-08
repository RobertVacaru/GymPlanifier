/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { styled } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
// import MuiLogo from './MuiLogo';
import ColorSchemeToggle from './ColorSchemeToggle';
import useAuthContext from "../contexts/AuthContext";

const Dropdown = styled('i')(({ theme }) => ({
  color: theme.vars.palette.text.tertiary,
}));

const closeSidebar = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
};

export default function Sidebar() {
  const {user} = useAuthContext();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 1.5,
        py: 3,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '224px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '256px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',

          opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {/*<MuiLogo />*/}
        <Typography fontWeight="xl">Gym Planifier</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input startDecorator={<i data-feather="search" />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List
          sx={{
            '--ListItem-radius': '8px',
            '--List-gap': '4px',
            '--List-nestedInsetStart': '40px',
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="home" />
              </ListItemDecorator>
              <ListItemContent>Home</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="bar-chart-2" />
              </ListItemDecorator>
              <ListItemContent>Dashboard</ListItemContent>
              <Dropdown data-feather="chevron-down" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="layers" />
              </ListItemDecorator>
              <ListItemContent>Projects</ListItemContent>
              <Dropdown data-feather="chevron-down" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="check-square" />
              </ListItemDecorator>
              <ListItemContent>Tasks</ListItemContent>
              <Dropdown data-feather="chevron-down" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="flag" />
              </ListItemDecorator>
              <ListItemContent>Reporting</ListItemContent>
              <Dropdown data-feather="chevron-down" />
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="bar-chart-2" />
              </ListItemDecorator>
              <ListItemContent>Users</ListItemContent>
              <i data-feather="chevron-up" />
            </ListItemButton>
            <List>
              <ListItem>
                <ListItemButton selected color="primary">
                  My Profile
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>New user</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>Role & Permission</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
        <List
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': '8px',
            '--List-gap': '8px',
          }}
        >
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="life-buoy" />
              </ListItemDecorator>
              <ListItemContent>Supports</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator>
                <i data-feather="settings" />
              </ListItemDecorator>
              <ListItemContent>Settings</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar variant="outlined" src="/static/images/avatar/3.jpg" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography fontSize="sm" fontWeight="lg">
            {user.name}
          </Typography>
          <Typography level="body-xs">{user.email}</Typography>
        </Box>
        <IconButton variant="plain" color="neutral">
          <i data-feather="log-out" />
        </IconButton>
      </Box>
    </Sheet>
  );
}
