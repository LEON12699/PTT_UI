import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Stack } from '@mui/material';
import RHFCustomAutoComplete from '../../components/hook-form/RHFCustomAutoComplete';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { ButtonGroup } from '../../components/common/CustomModalButtonGroup';

EditForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  allowedRoles: PropTypes.array,
  handleCancel: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export function EditForm({ onSubmit, handleCancel, formMethods, allowedRoles = [],isDisabled = false }) {
  const {
    handleSubmit,
    formState,
    formState: { isSubmitting },
    reset,
  } = formMethods;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ userId: [], role: '' });
    }
  }, [formState, reset]);

  return (
    <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="userId" type="hidden" style={{ display: 'none' }} />
        <RHFCustomAutoComplete
          name="role"
          options={allowedRoles}
          placeholder={'change role'}
          isFreeSolo
        />
      </Stack>
      <ButtonGroup disabledConfirmButton={isDisabled} handleCancel={handleCancel} confirmButtonText={'Save'} isSubmitting={isSubmitting} />
    </FormProvider>
  );
}
