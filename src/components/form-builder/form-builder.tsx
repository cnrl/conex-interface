/* eslint-disable react/jsx-key */
// todo: type hint

import { Stack } from '@mui/material';
import { Control, FieldValues, UseControllerProps } from 'react-hook-form';
import * as components from './fields';
import { SingleField } from './types';

export interface FormBuilderProps {
  fields: Record<string, SingleField>;
  name: string;
  control: Control<FieldValues, any>;
}

export const FormBuilder = ({ name, fields, control }: FormBuilderProps) => {
  return (
    <Stack key={name} sx={{ gap: 1.5 }}>
      {Object.entries(fields).map(([fieldName, field]) => {
        const fieldType = field?.type ?? null;

        const sharedProps = {
          key: fieldName,
          control: control,
          name: `${name}.${fieldName}`,
          defaultValue: field?.default || undefined,
          label: fieldName,
          helperText: field?.description,
        } as const;

        let constraints = null;
        let rules: UseControllerProps['rules'] = undefined;

        if (fieldType === 'int') {
          rules = { validate: components.number.validation.int };
          // todo: replace with fields.constraints (grabbed from the edited json) /*min: 0, max: 100,*/
          constraints = { step: 1, kind: 'int' as const };
          return <components.number.render {...sharedProps} {...constraints} rules={rules} />;
        }

        if (fieldType === 'float') {
          rules = { validate: components.number.validation.float };
          constraints = { kind: 'float' as const, step: 'any' as unknown as number };
          return <components.number.render {...sharedProps} {...constraints} rules={rules} />;
        }

        if (fieldType === 'str') {
          return <components.string.render {...sharedProps} />;
        }

        return <components.string.render {...sharedProps} />;
      })}
    </Stack>
  );
};
