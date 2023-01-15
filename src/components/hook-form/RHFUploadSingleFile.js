import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {  FormHelperText, Typography } from '@mui/material'
import { styled } from "@mui/material/styles"
import UploadSingleFile  from '../upload/UploadSingleFile'

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));


// ----------------------------------------------------------------------

RHFUploadSingleFile.propTypes = {
  name: PropTypes.string,
};

export default function RHFUploadSingleFile({ name, ...other }) {
  
  const { register, unregister, setValue, watch, getFieldState , formState} = useFormContext();
  const file = watch(name);
  const { error } = getFieldState(name,formState)

  const handleDrop = useCallback(
    (droppedFiles) => {
      const file = droppedFiles[0];
      if(file){
        setValue(name, {file, preview: URL.createObjectURL(file)}, { shouldValidate: true });
      }
    },
    [setValue, name]
  );

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <div>
      <LabelStyle>Cover</LabelStyle>
      <UploadSingleFile
        maxSize={3145728}
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'],
        }}
        file={file}
        onDrop={handleDrop}
        error={Boolean(error)}
        {...other}
      />
      {error && (
      <FormHelperText error sx={{ px: 2 }}>
        {error.type && error.message}
      </FormHelperText>
    )}
    </div>
  );
}
