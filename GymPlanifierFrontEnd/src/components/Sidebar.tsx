/* eslint-disable jsx-a11y/anchor-is-valid */
/// <reference types="vite-plugin-svgr/client" /
import * as React from 'react';
import {styled, useColorScheme} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ColorSchemeToggle from './ColorSchemeToggle';
import useAuthContext from "../contexts/AuthContext";
import {useNavigate} from "react-router";
import Logo from "../assets/workoutTypeIcons/logo.svg";
import DarkLogo from "../assets/workoutTypeIcons/DarkLogo.svg";

const Dropdown = styled('i')(({theme}) => ({
  color: theme.vars.palette.text.tertiary,
}));

const closeSidebar = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
};

export default function Sidebar() {
  const {user, logout} = useAuthContext();
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();

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
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <img src={mode === 'light' ? DarkLogo : Logo} className="w-12 inline-block" alt="logo" style={{width: '30px', height: '30px'}}/>
        <Typography fontWeight="xl">Gym Planifier</Typography>
        <ColorSchemeToggle sx={{ml: 'auto'}}/>
      </Box>
      <Divider/>
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
            <ListItemButton selected={window.location.pathname === '/'}>
              <ListItemDecorator>
                <i data-feather="home"/>
              </ListItemDecorator>
              <ListItemContent onClick={() => {
                navigate('/')
              }}>Home</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected={window.location.pathname === '/dailyWorkouts'}>
              <ListItemDecorator>
                <i data-feather="layers"/>
              </ListItemDecorator>
              <ListItemContent onClick={() => {
                navigate('/dailyWorkouts')
              }}>Daily Workouts</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected={window.location.pathname === '/myWorkouts'}>
              <ListItemDecorator>
                <i data-feather="list"/>
              </ListItemDecorator>
              <ListItemContent onClick={() => {
                navigate('/myWorkouts')
              }}>My Workouts</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected={window.location.pathname === '/addWorkout'}>
              <ListItemDecorator>
                <i data-feather="plus"/>
              </ListItemDecorator>
              <ListItemContent onClick={() => {
                navigate('/addWorkout')
              }}>Add Workout</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton selected={window.location.pathname === '/statistics'}>
              <ListItemDecorator>
                <i data-feather="bar-chart-2"/>
              </ListItemDecorator>
              <ListItemContent onClick={() => {
                navigate('/statistics')
              }}>Statistics</ListItemContent>
            </ListItemButton>
          </ListItem>
          {/*<ListItemButton selected={index === 2} onClick={() => {*/}
          {/*  setIndex(2)*/}
          {/*  setArrow(!arrow)*/}
          {/*}}>*/}
          {/*  <ListItemDecorator>*/}
          {/*    <i data-feather="bar-chart-2"/>*/}
          {/*  </ListItemDecorator>*/}
          {/*  <ListItemContent>Users</ListItemContent>*/}
          {/*  {arrow ? <ExpandLess/> : <ExpandMore/>}*/}
          {/*</ListItemButton>*/}
          {/*<ListItem nested>*/}
          {/*{arrow &&*/}
          {/*  <List>*/}
          {/*    <ListItem>*/}
          {/*      <ListItemButton selected={index === 3} color={index === 3 ? "primary" : undefined} onClick={() => {*/}
          {/*        setIndex(3)*/}
          {/*      }}>*/}
          {/*        My Profile*/}
          {/*      </ListItemButton>*/}
          {/*    </ListItem>*/}
          {/*    <ListItem>*/}
          {/*      <ListItemButton selected={index === 4} color={index === 4 ? "primary" : undefined} onClick={() => {*/}
          {/*        setIndex(4)*/}
          {/*      }}>New user</ListItemButton>*/}
          {/*    </ListItem>*/}
          {/*    <ListItem>*/}
          {/*      <ListItemButton selected={index === 5} color={index === 5 ? "primary" : undefined} onClick={() => {*/}
          {/*        setIndex(5)*/}
          {/*      }}>Role & Permission</ListItemButton>*/}
          {/*    </ListItem>*/}
          {/*  </List>}*/}
          {/*</ListItem>*/}
        </List>
        <List
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': '8px',
            '--List-gap': '8px',
          }}
        >
            {/*{<ListItem>*/}
            {/*    <ListItemButton>*/}
            {/*        <ListItemDecorator>*/}
            {/*            <i data-feather="settings"/>*/}
            {/*        </ListItemDecorator>*/}
            {/*        <ListItemContent>Settings</ListItemContent>*/}
            {/*    </ListItemButton>*/}
            {/*</ListItem>}*/}
        </List>
      </Box>
      <Divider/>
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Avatar variant="outlined" src="/static/images/avatar/3.jpg"/>
        <Box sx={{minWidth: 0, flex: 1}}>
          <Typography fontSize="sm" fontWeight="lg">
            {user.name}
          </Typography>
          <Typography level="body-xs">{user.email}</Typography>
        </Box>
        <IconButton variant="plain" color="neutral" onClick={() => logout()}>
          <i data-feather="log-out"/>
        </IconButton>
      </Box>
    </Sheet>
  );
}
