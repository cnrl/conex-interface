import { Stack } from '@mui/material';
import { Handle, NodeProps, NodeToolbar, Position } from '@xyflow/react';
import { useMemo } from 'react';
import useReactFlowStore from '../../../stores/react-flow';
import { ReactFlowAppNode, ReactFlowAppStoreState } from '../../../stores/types';
import { useShallow } from 'zustand/react/shallow';
import { drawer, infoDrawer } from '../../../stores/app-states';
const selector = (state: ReactFlowAppStoreState) => ({
  selectedNodeID: state.selectedNodeID,
  setSelectedNodeID: state.setSelectedNodeID,
});

export const NODE_TYPE = 'ng';
export const DEFAULT_COLOR = '#ff0072';
export const CustomNode = ({ id, data }: NodeProps<ReactFlowAppNode>) => {
  // TODO: increase by 10
  // TODO: update relative height of the box to its node indexes
  // TODO: distribute the heights to the nodes sources
  // TODO: assign id and relative info the the handle source/target where?
  // TODO: get size of the neuron group from the creation
  // TODO: edit is prefilled modal whit delete and place methods
  const nodes = useReactFlowStore(state => state.nodes);

  const styles = useMemo(() => {
    return {
      a: { top: 10 },
      b: { top: 20 },
    };
  }, []);
  const { selectedNodeID, setSelectedNodeID } = useReactFlowStore(useShallow(selector));

  return (
    <>
      <Handle position={Position.Right} type="target" />
      <NodeToolbar isVisible={true} position={Position.Top}>
        <button
          onClick={() => {
            console.log(nodes);
          }}
        >
          show state
        </button>
      </NodeToolbar>
      <Stack
        id={id}
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '4em',
          backgroundColor: data.color,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#fff',
          boxShadow: selectedNodeID == id ? '10px 5px 5px gray' : null,
        }}
        onClick={() => setSelectedNodeID(id)}
        onDoubleClick={() => {
          drawer.setOpen(false);
          infoDrawer.setID(id);
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
