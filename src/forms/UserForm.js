import { useEffect } from 'react';

// @mui
import { Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { PropTypes } from 'prop-types';
import { FormProvider, RHFTextField } from '../components/hook-form';
import Iconify from '../components/common/Iconify';

// ----------------------------------------------------------------------

HiddenUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  buttonGroup: PropTypes.element,
};

ActiveOrDeleteUserFrom.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formMethods: PropTypes.object.isRequired,
  disabledConfirmButton: PropTypes.bool,
  handleCancel: PropTypes.func.isRequired,
  confirmButtonText: PropTypes.string,
};

ButtonGroup.propTypes = {
  disabledConfirmButton: PropTypes.bool,
  confirmButtonColor: PropTypes.string,
  handleCancel: PropTypes.func,
  confirmButtonIcon: PropTypes.string,
  confirmButtonText: PropTypes.string,
  isSubmitting: PropTypes.bool,
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

function ButtonGroup({
  handleCancel,
  isSubmitting,
  disabledConfirmButton = false,
  confirmButtonColor = 'success',
  confirmButtonIcon = 'eva:save-outline',
  confirmButtonText = 'Confirm',
}) {
  return (
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
        {confirmButtonText}
      </LoadingButton>
    </div>
  );
}

export function ActiveOrDeleteUserFrom({
  onSubmit,
  formMethods,
  disabledConfirmButton,
  handleCancel,
  confirmButtonText,
}) {
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
