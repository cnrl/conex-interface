import GrainRoundedIcon from '@mui/icons-material/GrainRounded';
import { Stack, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { Handle, NodeProps, NodeToolbar, Position, useStoreApi } from 'reactflow';
import { onDragStart } from './helpers/bus-dispatcher';
import { NodeBaseTypeData, PreviewNodeTypes } from './types';

export const NAME = 'ng';
export const COLOR = '#ff0072';

// TODO: move coloring to theme
export const Preview = () => {
  return (
    <Tooltip title="Neuron group">
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
        <GrainRoundedIcon />
      </Stack>
    </Tooltip>
  );
};

export type CustomNodeProps = NodeProps<NodeBaseTypeData>;

export const CustomNode = ({ data }: CustomNodeProps) => {
  // TODO: increase by 10
  // TODO: update relative height of the box to its node indexes
  // TODO: distribute the heights to the nodes sources
  // TODO: assign id and relative info the the handle source/target where?
  // TODO: get size of the neuron group from the creation
  // TODO: edit is prefilled modal whit delete and place methods
  const store = useStoreApi();

  const styles = useMemo(() => {
    return {
      a: { top: 10 },
      b: { top: 20 },
    };
  }, []);

  return (
    <>
      <Handle position={Position.Right} type="target" />
      <NodeToolbar isVisible={true} position={Position.Top}>
        <button
          onClick={() => {
            console.log(store.getState().getNodes());
          }}
        >
          show state
        </button>
      </NodeToolbar>
      <Stack
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '4em',
          backgroundColor: COLOR,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#fff',
        }}
      >
        {data.label}
        <span>-</span>
      </Stack>
      <Handle id="a" position={Position.Left} style={styles.a} type="source" />
      <Handle id="b" position={Position.Left} style={styles.b} type="source" />
    </>
  );
};
