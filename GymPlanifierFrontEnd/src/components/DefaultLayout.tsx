import {Navigate, Outlet} from "react-router-dom";
import useAuthContext from "../contexts/AuthContext.tsx";
import * as React from 'react';
import {CssVarsProvider} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import useScript from '../useScript';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DefaultLayout() {
  const user = useAuthContext();

  const useEnhancedEffect =
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== 'undefined') {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);
  // @ts-ignore
  return user?.user ?
    (
      <CssVarsProvider disableTransitionOnChange>
        <GlobalStyles
          styles={(theme) => ({
            '[data-feather], .feather': {
              color: `var(--Icon-color, ${theme.vars.palette.text.icon})`,
              margin: 'var(--Icon-margin)',
              fontSize: `var(--Icon-fontSize, ${theme.vars.fontSize.xl})`,
              width: '1em',
              height: '1em',
            },
          })}
        />
        <CssBaseline/>
        <Box sx={{display: 'flex', minHeight: '100dvh'}}>
          <Header/>
          <Sidebar/>
          <Box
            component="main"
            className="MainContent"
            sx={(theme) => ({
              '--main-paddingTop': {
                xs: `calc(${theme.spacing(2)} + var(--Header-height, 0px))`,
                md: '32px',
              },
              px: {
                xs: 2,
                md: 3,
              },
              pt: 'var(--main-paddingTop)',
              pb: {
                xs: 2,
                sm: 2,
                md: 3,
              },
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              height: '100dvh',
              gap: 1,
              overflow: 'auto',
            })}
          >
            <Outlet/>
          </Box>
        </Box>
      </CssVarsProvider>
    )
    : <Navigate to={'/login'}/>
}
