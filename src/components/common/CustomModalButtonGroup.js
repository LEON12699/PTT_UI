
import { PropTypes } from 'prop-types';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from './Iconify';

ButtonGroup.propTypes = {
  disabledConfirmButton: PropTypes.bool,
  confirmButtonColor: PropTypes.string,
  handleCancel: PropTypes.func,
  confirmButtonIcon: PropTypes.string,
  confirmButtonText: PropTypes.string,
  isSubmitting: PropTypes.bool,
  size: PropTypes.string,
};


export function ButtonGroup({
  handleCancel,
  isSubmitting,
  disabledConfirmButton = false,
  confirmButtonColor = 'success',
  confirmButtonIcon = 'eva:save-outline',
  confirmButtonText = 'Confirm',
  size= 'small'
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
        size={size}
        style={{ marginRight: '5px' }}
      >
        Cancel
      </Button>
      <LoadingButton
        size={size}
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
