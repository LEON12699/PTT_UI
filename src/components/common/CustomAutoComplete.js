import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import { PropTypes } from 'prop-types';
import Iconify from "./Iconify";

const icon = <Iconify icon="eva:checkmark-square-2-outline" fontSize="small" />;
const checkedIcon = <Iconify icon="eva:checkmark-square-2-fill"  fontSize="small" />;

CustomAutoComplete.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  warning: PropTypes.bool,
  onChange: PropTypes.func,
  isFreeSolo: PropTypes.bool,
  multiple: PropTypes.bool,
  defaultValue: PropTypes.any,
  disableClearable: PropTypes.bool,
  inputRef: PropTypes.any,
}
export function CustomAutoComplete  ({
  value,
  label,
  placeholder,
  error,
  helperText,
  warning = false,
  onChange,
  options = [],
  isFreeSolo = false,
  defaultValue = '',
  disableClearable = false,
  multiple= false,
  ...rest
}) {
  const textFieldProps = {helperText, error, label, placeholder, ...(warning && {color: 'warning'})};
  
  return (
    <Autocomplete
      {...rest}
      value={value}
      onChange={onChange}
      sx={{ width: "100%" }}
      multiple={multiple}
      id="tags-filled"
      options={options}
      freeSolo={isFreeSolo}
      defaultValue={defaultValue}
      disableClearable={disableClearable}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} {...textFieldProps} />
      )}
    />
  );
};
