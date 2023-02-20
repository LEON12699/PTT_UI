import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';

// routes
import { PATH_AUTH } from '../routes/paths';
// components
import Page from '../components/Page';
import ResetPasswordForm  from '../forms/auth/ResetPasswordForm';
//
import { SentIcon } from '../assets';
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password | Minimal UI">
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will email you a link to reset your
                password.
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 5 }}>
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
