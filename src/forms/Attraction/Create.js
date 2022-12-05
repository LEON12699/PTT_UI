import * as Yup from 'yup';

import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { ButtonGroup } from '../../components/common/CustomModalButtonGroup';
import { RHFCustomAutoComplete } from '../../components/hook-form';
import FileInput from '../../components/hook-form/RHFFileInput';
import { postAttraction } from '../../services/attraction.service';

// 1024 * 1024 * 1; // 1MB
const CANTON_OPTIONS = ['Zapotillo', 'Paltas', 'Celica', 'Puyango', 'Macará', 'Pindal'];

CreateAttractionForm.propTypes = {
  handleCancel: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export function CreateAttractionForm({ handleCancel, isDisabled = false }) {
  const CreateSchema = Yup.object().shape({
    name: Yup.string().required('Attraction name is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    longDescription: Yup.string(),
    shortDescription: Yup.string().required('Resume is required'),
    coverImage: Yup.mixed().required('Cover image is required'),
    images: Yup.mixed(),
    cantonName: Yup.string().required('Canton is required'),
  });

  const defaultValues = {
    name: '',
    latitude: 0,
    longitude: 0,
    shortDescription: '',
    longDescription: '',
    coverImage: null,
    images: [],
    cantonName: '',
  };

  const methods = useForm({
    resolver: yupResolver(CreateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    formState,
    reset,
  } = methods;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        name: '',
        latitude: 0,
        longitude: 0,
        shortDescription: '',
        longDescription: '',
        coverImage: null,
        images: [],
        cantonName: '',
      });
    }
  }, [formState, reset]);

  const onSubmit = async (data) => {
      const response = await postAttraction(data);
      if (response.status === 201 || response.status === 200) {
        toast.success('Attraction created successfully') 
      }
      else{
        toast.error('Error creating attraction');;
      }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Attraction name" required />
        <RHFCustomAutoComplete name="cantonName" required label="Canton" options={CANTON_OPTIONS} />
        <Stack spacing={2} direction="row">
          <RHFTextField name="latitude" type="number" label="latitude" required />
          <RHFTextField name="longitude" type="number" label="longitude" required />
        </Stack>
        <RHFTextField
          name="shortDescription"
          label="Resume"
          multiline
          minRows={2}
          maxRows={4}
          placeholder="Write the more important things"
          required
          helperText="max chars"
        />
        <RHFTextField
          multiline
          name="longDescription"
          label="Details"
          placeholder="Describe here..."
          maxRows={6}
          minRows={4}
        />
        <FileInput
          name="coverImage"
          label="Image"
          accept={{
            'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'],
          }}
        />
      </Stack>
      <ButtonGroup
        disabledConfirmButton={isDisabled}
        handleCancel={handleCancel}
        confirmButtonText={'Save'}
        isSubmitting={isSubmitting}
      />
    </FormProvider>
  );
}
