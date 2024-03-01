import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { Handle, Node, NodeProps, NodeToolbar, Position, useStoreApi } from 'reactflow';

type NeuronGroupNodeData = {
  label: string;
};

export type TNeuronGroupNode = Node<NeuronGroupNodeData>;

export const NeuronGroupNode = ({ data }: NodeProps<NeuronGroupNodeData>) => {
  // TODO: increase by 10
  // TODO: update relative height of the box to its node indexes
  // TODO: distribute the heights to the nodes sources
  // TODO: assign id and relative info the the handle source/target where?
  // TODO: get size of the neuron group from the creation
  // TODO: edit is prefilled modal whit delete and place methods
  const store = useStoreApi();
  console.log(data.label);

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
            console.log(store.getState());
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
          backgroundColor: 'crimson',
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
