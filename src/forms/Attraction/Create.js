import * as Yup from 'yup';

import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack, Paper, Typography } from '@mui/material';
import { Wrapper } from '@googlemaps/react-wrapper';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { ButtonGroup } from '../../components/common/CustomModalButtonGroup';
import { RHFCustomAutoComplete } from '../../components/hook-form';
import FileInput from '../../components/hook-form/RHFFileInput';
import { postAttraction } from '../../services/attraction.service';
import { Map, Marker } from '../../components/map';
import EnvManager from '../../config/envManager';
import LoadingIndicator from '../../components/common/LoadingSpinner';
import { CANTON_OPTIONS, CANTON_LABELS } from '../../utils/constants';


// 1024 * 1024 * 1; // 1MB



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
    watch,
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

  const watchCantonName = watch('cantonName');
  const [position, setPosition] = useState(null);
  const [restriction, setRestriction] = useState(null);
  const [zoom, setZoom] = useState(15); // initial zoom
  const [center, setCenter] = useState({
    lat: -3.99313,
    lng: -79.20422,
  });


  useEffect(() => {
    if (watchCantonName) {
      const canton = CANTON_OPTIONS.find((c) => c.label === watchCantonName);
      if (canton?.center && canton?.zoom) {
        setCenter(canton.center);
        setZoom(canton.zoom);
        if(canton.restriction) {
          setRestriction(canton.restriction);
        }
      }
    }
  }, [watchCantonName]);

  const onClick = (e) => {
    // avoid directly mutating state
    setPosition(e.latLng);
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const render = () => <LoadingIndicator/>;

  const onSubmit = async (data) => {
    const response = await postAttraction(data);
    if (response.status === 201 || response.status === 200) {
      toast.success('Attraction created successfully');
    } else {
      toast.error('Error creating attraction');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="name" label="Attraction name" required />
        <FileInput
          name="coverImage"
          label="Image"
          accept={{
            'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.svg'],
          }}
        />
        <Paper elevation={5} rounded sx={{ padding: 2 }}>
          <Stack spacing={3}>
            <Typography variant="subtitle2"> Position</Typography>
            <Typography variant="body2"> Please select the canton and mark the position on the map</Typography>

            <RHFCustomAutoComplete name="cantonName" required label="Canton" options={CANTON_LABELS} />
            { watchCantonName && (
              <>
                <div style={{ display: 'flex', width: '100%', height: '500px' }}>
                  <Wrapper apiKey={EnvManager.GOOGLE_MAP_KEY} render={render}>
                    <Map
                      center={center}
                      onClick={onClick}
                      onIdle={onIdle}
                      zoom={zoom}
                      minZoom={8}
                      maxZoom={22}
                      style={{ flexGrow: '1', height: '100%' }}
                      restriction={restriction}
                    >
                      {position && <Marker key={'marker-lat-long'} position={position} />}
                    </Map>
                  </Wrapper>
                </div>
                <Stack spacing={2} direction="row">
                  <RHFTextField
                    name="latitude"
                    disabled
                    type="number"
                    label="latitude"
                    required
                    value={position?.lat() ?? ''}
                  />
                  <RHFTextField
                    name="longitude"
                    disabled
                    type="number"
                    label="longitude"
                    required
                    value={position?.lng() ?? ''}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </Paper>
        <RHFTextField
          name="shortDescription"
          label="Details"
          multiline
          minRows={6}
          maxRows={8}
          placeholder="Describe the attraction here..."
          required
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
