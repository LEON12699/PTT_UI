import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { PropTypes } from 'prop-types';

ToastAlert.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.string,
};

export default function ToastAlert({ open, handleClose, message, severity = 'success' }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={() => {}} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
