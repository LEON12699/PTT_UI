import { useEffect } from 'react';

// @mui
import { Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { PropTypes } from 'prop-types';
import { FormProvider, RHFTextField } from '../components/hook-form';
import Iconify from '../components/common/Iconify';

// ----------------------------------------------------------------------

DeleteUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  disabledConfirmButton: PropTypes.bool,
  confirmButtonColor: PropTypes.string,
  handleCancel: PropTypes.func,
  confirmButtonIcon: PropTypes.string,
};

export default function DeleteUserForm({
  onSubmit,
  formMethods,
  handleCancel,
  disabledConfirmButton = false,
  confirmButtonColor = 'success',
  confirmButtonIcon = 'eva:save-outline',
}) {

  const {
    handleSubmit,
    formState,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ userId: '', email:'' });
    }
  }, [formState, reset]);

  return (
    <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="userId" type="hidden" style={{ display: "none"}}/>

        <RHFTextField label="email" name="email" type="email" disabled />
      </Stack>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <Button
          variant="contained"
          onClick={handleCancel}
          color={'error'}
          startIcon={<Iconify icon="eva:close-outline" />}
          size="small"
          style={{ marginRight: '5px' }}
        >
          Cancel
        </Button>
        <LoadingButton
          size="small"
          disabled={disabledConfirmButton}
          type="submit"
          variant="contained"
          startIcon={<Iconify icon={confirmButtonIcon} />}
          color={confirmButtonColor}
          loading={isSubmitting}
        >
          Delete
        </LoadingButton>
      </div>
    </FormProvider>
  );
}
