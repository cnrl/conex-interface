import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import type { ReactFlowAppNode } from '@stores/types';
import { Handle, NodeProps, Position } from '@xyflow/react';

export const NODE_TYPE = 'i';
export const DEFAULT_COLOR = '#7cb342';

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
        <SvgIcon component={LastPageRoundedIcon} sx={{ fontSize: '1rem' }} />
        {data.label}
      </Stack>
      <Handle position={Position.Right} type="target" />
    </>
  );
};
