import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';

type OutputPortNodeData = {
  label: string;
};

export const OutputPortNode = ({ data }: NodeProps<OutputPortNodeData>) => {
  return (
    <>
      <Stack
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '2em',
          backgroundColor: '#f4511e',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#fff',
        }}
      >
        <SvgIcon component={FirstPageRoundedIcon} sx={{ fontSize: '1rem' }} />
        {data.label}
      </Stack>
      <Handle position={Position.Left} type="source" />
    </>
  );
};
