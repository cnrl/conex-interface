import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { ReactFlowAppNode } from '../../../stores/types';

export const NODE_TYPE = 'o';
export const DEFAULT_COLOR = '#f4511e';

export const CustomNode = ({ id, data }: NodeProps<ReactFlowAppNode>) => {
  return (
    <>
      <Stack
        id={id}
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '2em',
          backgroundColor: data.color,
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
