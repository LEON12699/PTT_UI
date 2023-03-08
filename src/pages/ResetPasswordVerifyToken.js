import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// material
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

// components
import Page from '../components/Page';
//
import Logo from '../components/Logo';
import ChangePasswordForm from '../forms/auth/ChangePasswordForm';
import { SentIcon } from '../assets';
import { useAuth } from '../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
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

export default function ResetPasswordVerifyToken() {
  const { token } = useParams();
  const auth = useAuth();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    try {
      await auth.resetPassword(password, confirmPassword, token);
      setSent(true);
    } catch (e) {
      toast.error(`${e?.response?.data?.message}`, { position: 'top-center' });
    }
  };

  return (
    <RootStyle title="Reset Password | New Password ">
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
                Please enter your new password.
              </Typography>
              
              <ChangePasswordForm onSubmit={onSubmit} />
            </>
          ) : (
            <>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                Your password has been changed &nbsp;
                <br />
                Please log back into the application
              </Typography>
            </>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
