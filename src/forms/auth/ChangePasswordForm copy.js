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
};

export default function ResetPasswordForm({ onSent }) {
  const auth = useAuth();

  const ResetPasswordSchema =  Yup.object().shape({
    password: Yup.string().required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales')
      .required('Debes confirmar tu contraseña'),
  });


  const defaultValues = {
    password: '',
    confirmPassword: ''
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
