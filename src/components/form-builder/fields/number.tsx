import { NumberInputProps } from '@mui/base/Unstable_NumberInput';
import { Divider, InputAdornment, TextField } from '@mui/material';
import { Fragment, forwardRef } from 'react';
import { Controller, ControllerProps, ControllerRenderProps, FieldValues } from 'react-hook-form';
import { validators } from './number.helpers';

// const NumberInner = forwardRef(function CustomNumberInput(
//   props: ControllerRenderProps<any, any>,
//   ref: React.ForwardedRef<HTMLDivElement>,
// ) {
//   return (
//     <BaseNumberInput
//       slotProps={{
//         incrementButton: { children: <span className="arrow">▴</span> },
//         decrementButton: { children: <span className="arrow">▾</span> },
//       }}
//       {...props}
//       onChange={(_event, val) => props.onChange(val)}
//       ref={ref}
//     />
//   );
// });

type TKinds = { kind: 'int' | 'float' };

const NumberInner = forwardRef(function CustomNumberInput(
  { kind, onChange, ...props }: ControllerRenderProps<any, any> & TKinds,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  console.log(kind);
  return (
    <Fragment>
      <TextField
        {...props}
        ref={ref}
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
          if (shouldByPassUpdate) return;

          onChange(value);
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
      render={({ field, fieldState }) => <NumberInner {...field} {...props} {...fieldState} kind={kind} />}
      rules={rules}
    />
  );
};
