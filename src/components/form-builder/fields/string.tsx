import { Divider, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { Controller, ControllerProps, ControllerRenderProps, FieldValues } from 'react-hook-form';

const StringInner = forwardRef(function CustomStringInput(
  props: ControllerRenderProps<any, any>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <>
      <TextField {...props} ref={ref} />
      <Divider variant="middle" />
    </>
  );
});

export const String = <TFields extends FieldValues>({
  control,
  name,
  defaultValue,
  ...props
}: Omit<ControllerProps<TFields>, 'render'> & TextFieldProps) => {
  return (
    <Controller
      shouldUnregister
      control={control}
      defaultValue={defaultValue}
      name={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render={({ field }) => <StringInner {...field} {...props} />}
    />
  );
};
