import { useEffect } from 'react';

// @mui
import { Stack } from '@mui/material';
// components
import { PropTypes } from 'prop-types';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { ButtonGroup } from '../../components/common/CustomModalButtonGroup'

// ----------------------------------------------------------------------

HiddenUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  buttonGroup: PropTypes.element,
};

ActiveOrDeleteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  disabledConfirmButton: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string,
};


function HiddenUserForm({ onSubmit, formMethods, buttonGroup }) {
  const { handleSubmit, formState, reset } = formMethods;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ userId: [] });
    }
  }, [formState, reset]);

  return (
    <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField name="userId" type="hidden" style={{ display: 'none' }} />
      </Stack>
      {buttonGroup}
    </FormProvider>
  );
}



export function ActiveOrDeleteForm({ onSubmit, formMethods, disabledConfirmButton, handleCancel, confirmButtonText }) {
  const {
    formState,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ userId: [] });
    }
  }, [formState, reset]);

  const buttons = (
    <ButtonGroup
      disabledConfirmButton={disabledConfirmButton}
      handleCancel={handleCancel}
      confirmButtonText={confirmButtonText}
      isSubmitting={isSubmitting}
    />
  );

  return <HiddenUserForm buttonGroup={buttons} onSubmit={onSubmit} formMethods={formMethods} />;
}
