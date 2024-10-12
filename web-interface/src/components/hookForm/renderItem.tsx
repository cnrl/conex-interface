import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CodeHighlighter from './codeHighlighter';
const textFieldTypes = ['number', 'text', 'password', 'string'];
const codeFieldTypes = ['code'];
const selectFieldTypes = ['selectable'];

const RenderItem = ({ item, register, errors, getValues, setValue, watch }) => {
  if (textFieldTypes.includes(item.type))
    return (
      <>
        <TextField
          fullWidth
          label={item.label}
          size="small"
          variant="filled"
          {...register(item.id)}
          error={errors[item.id]}
          helperText={errors[item.id]?.message}
        />
      </>
    );
  if (codeFieldTypes.includes(item.type))
    return <CodeHighlighter getValues={getValues} item={item} register={register} />;

  if (selectFieldTypes.includes(item.type))
    return (
      <FormControl fullWidth variant="standard">
        <InputLabel id={'select-standard-label' + item.id} size="small" sx={{ px: 2 }}>
          {item.label}
        </InputLabel>
        <Select
          {...register(item.id)}
          fullWidth
          error={errors[item.id]}
          label={item.label}
          labelId={'select-standard-label' + item.id}
          size="small"
          value={watch(item.id) || ''}
          variant="filled"
          onChange={e => {
            setValue(item.id, e.target.value);
          }}
        >
          {item.options &&
            item.options.map(i => (
              <MenuItem key={'item_' + i.value} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
        </Select>
        {errors[item.id]?.message && <FormHelperText error>{errors[item.id]?.message}</FormHelperText>}
      </FormControl>
    );
};

export default RenderItem;
