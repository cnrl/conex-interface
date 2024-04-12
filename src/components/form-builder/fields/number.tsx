import { NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { Divider, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Fragment, forwardRef } from 'react';
import { Controller, ControllerProps, ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form';
import { validators } from './number.helpers';

type TKinds = { kind: 'int' | 'float' };
type TError = { error?: FieldError };

const NumberInner = forwardRef(function CustomNumberInput(
  { kind, onChange, error, ...props }: TextFieldProps & ControllerRenderProps<any, any> & TKinds & TError,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  props.helperText = error?.message || props.helperText;
  return (
    <Fragment>
      <TextField
        {...props}
        ref={ref}
        error={!!error}
        type="number"
        InputProps={{
          inputMode: 'numeric',
          title: '',
          startAdornment: (
            <InputAdornment disableTypography position="start" sx={{ fontSize: '0.7rem', color: 'cornflowerblue' }}>
              [{kind}]
            </InputAdornment>
          ),
        }}
        onChange={e => {
          const value = e.target.value;
          const shouldByPassUpdate =
            !onChange ||
            (value && ((kind === 'int' && !validators.int(value)) || (kind === 'float' && !validators.float(value))));
          console.log({
            kind,
            validate: validators.float(value),
          });
          if (shouldByPassUpdate) return;

          onChange(value ? +value : value);
        }}
        onKeyDown={e => {
          if (kind === 'int' && e.key === '.') e.preventDefault();
        }}
      />
      <Divider variant="middle" />
    </Fragment>
  );
});

export const Number = <TFields extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  kind,
  ...props
}: Omit<ControllerProps<TFields>, 'render'> & TKinds & NumberInputProps) => {
  return (
    <Controller
      shouldUnregister
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return <NumberInner {...field} {...props} error={error} kind={kind} />;
      }}
    />
  );
};
