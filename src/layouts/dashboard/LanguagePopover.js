import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'es',
    label: 'Spanish',
    icon: '/static/icons/ic_flag_es.svg',
  },
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg',
  }

];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndexLanguage, setSelectedIndexLanguage] = useState(0);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (_, index) => {
    setSelectedIndexLanguage(index);
    handleClose();
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[selectedIndexLanguage].icon} alt={LANGS[selectedIndexLanguage].label} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option, index) => (
            <MenuItem key={option.value} selected={index === selectedIndexLanguage} onClick={(event) => handleMenuItemClick(event, index)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
