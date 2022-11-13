import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';

import { CustomAutoComplete } from '../common/CustomAutoComplete';

// ----------------------------------------------------------------------

RHFCustomAutoComplete.propTypes = {
  name: PropTypes.string,
};

export default function RHFCustomAutoComplete({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      onChange={([, data]) => data}
      render={({ field, fieldState: { error } }) => (
        <CustomAutoComplete
          {...field}
          fullWidth
          disableClearable
          onChange={(e, data) => field.onChange(data)}
          value={ field.value || '' }
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
