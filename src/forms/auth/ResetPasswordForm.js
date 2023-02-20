import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';

// toast
import { toast } from 'react-toastify';
// components
import PropTypes from 'prop-types';
import Iconify from '../../components/common/Iconify';
import { FormProvider, RHFTextField } from '../../components/hook-form';

import { useAuth } from '../../hooks/useAuth';
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const auth = useAuth();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });


  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email } = data;
    try {
    await auth.forgotPassword(email);
    onSent();
    onGetEmail(email);
    } catch(e) {
      toast.error(`${e?.response?.data?.message}`, { position:'top-center'})
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Reset Password
      </LoadingButton>
    </FormProvider>
  );
}
