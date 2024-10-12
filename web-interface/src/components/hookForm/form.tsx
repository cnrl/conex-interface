import { Box, Button, IconButton, Stack, styled, TextField } from '@mui/material';
import { fullSizeStyle } from '../../styles/BaseComponents';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import BackspaceTwoToneIcon from '@mui/icons-material/BackspaceTwoTone';

import * as yup from 'yup';
import { createYupSchema } from './yupSchemaCreator';
import { formData } from './formData';
import { useForm } from 'react-hook-form';
import RenderItem from './renderItem';

const Container = styled(Box)(() => ({
  ...fullSizeStyle,
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '50px calc(100% - 132px) 50px',
  gap: '16px',
  padding: '4px',
}));

const CustomForm = ({ fields = formData.ng, onSubmit, id = '0' }) => {
  const [searchText, setSearchText] = useState<string>('');

  const yupSchema = fields.reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yupSchema);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.id] = field.value;

      return acc;
    }, {}),
  });

  useEffect(() => {
    const defaultValues = fields.reduce((acc, field) => {
      acc[field.id] = field.value;
      return acc;
    }, {});

    reset(defaultValues); // Reset the form with new default values
  }, [id, fields, reset]);

  const search = (items, key) => {
    if (!key) return [...items]; // Return original items if searchText is empty
    return items.filter(item => {
      return item.label.toLowerCase().includes(key.toLowerCase());
    });
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ ...fullSizeStyle }}>
        <TextField
          fullWidth
          label="Search"
          size="small"
          title="Search"
          value={searchText}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton sx={{ display: searchText ? 'block' : 'none', p: 0 }} onClick={() => setSearchText('')}>
                  <BackspaceTwoToneIcon fontSize="small" variant="" />
                </IconButton>
              ),
            },
          }}
          onChange={e => {
            setSearchText(e.target.value);
          }}
        />
      </Box>
      <Stack spacing={1} sx={{ overflowX: 'scroll', height: '100%' }}>
        {search(fields, searchText).map(item => (
          <RenderItem
            key={item.id}
            errors={errors}
            getValues={getValues}
            item={item}
            register={register}
            setValue={setValue}
            watch={watch}
          />
        ))}
      </Stack>
      <Box sx={{ ...fullSizeStyle }}>
        <Button fullWidth type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default CustomForm;
