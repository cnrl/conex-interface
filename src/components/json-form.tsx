import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Box } from '@mui/material';
import { useState } from 'react';
import schema from './json/schema.json';
import uischema from './json/uischema.json';

export function JsonFormComponent() {
  const [data, setData] = useState({});
  return (
    <Box
      sx={{
        '& > .MuiGrid-container > .MuiGrid-item': {
          margin: 1,
        },
      }}
    >
      <JsonForms
        cells={materialCells}
        data={data}
        renderers={materialRenderers}
        schema={schema}
        uischema={uischema}
        onChange={({ data, errors }) => {
          console.log({ data, errors });
          setData(data);
        }}
      />
    </Box>
  );
}
