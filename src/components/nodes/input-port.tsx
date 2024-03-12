import InputRoundedIcon from '@mui/icons-material/InputRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { Stack, SvgIcon, Tooltip } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';
import { onDragStart } from './helpers/bus-dispatcher';
import { NodeBaseTypeData } from './types';

export const NAME = 'i';
export const COLOR = '#7cb342';

// TODO: move coloring to theme
export const Preview = () => {
  return (
    <Tooltip title="Output tag">
      <Stack
        draggable
        sx={{
          display: 'inline-flex',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          background: '#7cb342',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'grab',
        }}
        onDragStart={onDragStart(NAME)}
      >
        <InputRoundedIcon />
      </Stack>
    </Tooltip>
  );
};

export type CustomNodeProps = NodeProps<NodeBaseTypeData>;

export const CustomNode = ({ data }: CustomNodeProps) => {
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
