import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import { Stack, SvgIcon, Tooltip } from '@mui/material';
import { Handle, NodeProps, Position } from 'reactflow';
import { onDragStart } from './helpers/bus-dispatcher';
import { NodeBaseTypeData, PreviewNodeTypes } from './types';

export const NAME = 'o';
export const COLOR = '#f4511e';

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
          background: COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'grab',
        }}
        onDragStart={onDragStart<PreviewNodeTypes>(NAME)}
      >
        <OutputRoundedIcon />
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
