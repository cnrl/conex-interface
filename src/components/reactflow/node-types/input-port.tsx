import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import { Handle, Position } from 'reactflow';

interface NeuronGroupNodeProps {
  data: {
    label: string;
  };
}

export const InputPortNode = ({ data }: NeuronGroupNodeProps) => {
  return (
    <>
      <Stack
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '2em',
          backgroundColor: '#7cb342',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#fff',
        }}
      >
        <SvgIcon component={LastPageRoundedIcon} sx={{ fontSize: '1rem' }} />
        {data.label}
      </Stack>
      <Handle position={Position.Right} type="target" />
    </>
  );
};
