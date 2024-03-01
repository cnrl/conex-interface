import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';

type InputPortNodeData = {
  label: string;
};

export const InputPortNode = ({ data }: NodeProps<InputPortNodeData>) => {
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
