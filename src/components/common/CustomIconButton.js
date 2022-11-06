import { Tooltip, IconButton } from '@mui/material';
import { PropTypes } from 'prop-types';
import Iconify from './Iconify';

CustomIconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  placement: PropTypes.string,
};

export default function CustomIconButton({
  onClick,
  icon,
  title,
  color = 'primary.main',
  placement = 'right',
}){
  return (
    <Tooltip title={title} placement={placement} arrow >
    <IconButton
      sx={{ color }}
      aria-label={title}
      onClick={onClick}
    >
      <Iconify icon={icon} />
    </IconButton>
  </Tooltip>
  )
}
