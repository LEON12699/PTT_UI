import { useFormContext } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormHelperText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import UploadMultiFile from '../upload/UploadMultiFile';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

RHFUploadMultipleFile.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  isEdit: PropTypes.bool,
};

export default function RHFUploadMultipleFile({ name, label, isEdit }) {
  const { register, unregister, setValue, watch, getFieldState, formState } = useFormContext();
  const files = watch(name);
  const { error } = getFieldState(name, formState);

  const handleDrop = useCallback(
    (droppedFiles) => {
      const getImageWithPreview = (image) => ({ file: image, preview: URL.createObjectURL(image) });
      const acceptedFiles = droppedFiles?.map((droppedFile) => getImageWithPreview(droppedFile)) || [];
      const newFiles = (Boolean(files?.length) && [...files].concat(acceptedFiles)) || acceptedFiles;
      setValue(name, newFiles, { shouldValidate: true });
    },
    [files, setValue, name]
  );

  const handleRemoveAll = () => {
    setValue(name, []);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setValue(name, filteredItems);
  };

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <div>
      <LabelStyle>{label}</LabelStyle>
      <UploadMultiFile
        showPreview
        maxSize={3145728}
        accept={{
          'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'],
        }}
        files={files}
        isEdit={isEdit}
        onDrop={handleDrop}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        error={Boolean(error)}
      />
      {error && (
        <FormHelperText error sx={{ px: 2 }}>
          {error.type && error.message}
        </FormHelperText>
      )}
    </div>
  );
}
