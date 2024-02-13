import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import customTheme from '../theme.ts';
import useAuthContext from "../contexts/AuthContext.tsx";
import Logo from "../assets/workoutTypeIcons/logo.svg";
import {useNavigate} from "react-router";
import DarkLogo from "../assets/workoutTypeIcons/DarkLogo.svg";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  password_confirmation: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle({ onClick, ...props }: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Register()  {
  //@ts-ignore
  const {register, errors} = useAuthContext();
  const navigate = useNavigate();
  const handleRegister = async (data: object) => {
    register(data);
  }

  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px',
            '--Cover-width': '40vw',
            '--Form-maxWidth': '700px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(255 255 255 / 0.6)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontWeight="lg"
              startDecorator={
                <Box
                  component="img"
                  sx={(theme) => ({
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    content: `url(${Logo})`,
                    [theme.getColorSchemeSelector('light')] : {
                      content: `url(${DarkLogo})`
                    }
                  })}
                >
                </Box>
              }
            >
              Gym Planifier
            </Typography>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Register your new account
              </Typography>
            </div>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  name: formElements.name.value,
                  email: formElements.email.value,
                  password: formElements.password.value,
                  password_confirmation: formElements.password_confirmation.value,
                  persistent: formElements.persistent.checked,
                };
                handleRegister(data);
              }}
            >
              <FormControl required>
                <FormLabel>Name</FormLabel>
                <Input type="name" name="name" error={!!errors}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" error={!!errors}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" error={!!errors}/>
              </FormControl>
              <FormControl required>
                <FormLabel>Confirm password</FormLabel>
                <Input type="password" name="password_confirmation" error={!!errors}/>
              </FormControl>
              {errors && <span style={{color: 'red'}}>{errors?.email || errors?.password || errors?.password_confirmation}</span>}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label="Remember for 30 days" name="persistent" />
              </Box>
              <Button type="submit" fullWidth>
                Register
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                onClick={() => navigate('/login')}
              >
                Back to the login page
              </Button>
            </form>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Gym Planifier {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://previews.123rf.com/images/rh2010/rh20101811/rh2010181100094/129898099-close-up-of-a-stand-full-of-dumbbells-at-the-white-gym-interior.jpg)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.squarespace-cdn.com/content/v1/6088bf84f6460a6aaca60f42/1623041285038-QBNX9Q69SXAUBY8JVMCN/610_9576.jpg)',
          },
        })}
      />
    </CssVarsProvider>
  );
}

