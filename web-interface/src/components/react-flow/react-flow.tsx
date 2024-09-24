import { Background, Controls, MiniMap, ReactFlow as ReactFlowInternal } from '@xyflow/react';
import { useShallow } from 'zustand/react/shallow';

import { Box } from '@mui/material';
import '@xyflow/react/dist/style.css';
import useReactFlowStore from '../../stores/react-flow';
import type { ReactFlowAppStoreState } from '../../stores/types';
import { CustomControls } from './custom-controls';
import { nodeTypes } from './nodes';
import './react-flow.css';

const selector = (state: ReactFlowAppStoreState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

// TODO: mini map (name, color, toggle-able)
const minimapStyle = { height: 120 };

export const ReactFlow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useReactFlowStore(useShallow(selector));
  return (
    <Box sx={{ height: 1 }}>
      <ReactFlowInternal
        fitView
        attributionPosition="top-left"
        className="validation"
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}

        // isValidConnection={isValidConnection}
        // onDragOver={onDragOver}
        // onDrop={onDrop}
        // onEdgeClick={(_event, edge) => setPropertyDrawerEdgeId(edge.id)}
        // onEdgesChange={onEdgesChange}
        // onInit={setReactFlowInstance}
        // onNodeClick={(_event, node) => setPropertyDrawerNodeId(node.id)}
        // onNodesChange={onNodesChange}
      >
        <MiniMap pannable zoomable style={minimapStyle} />
        <Controls />
        <CustomControls />
        <Background color="#aaa" gap={16} />
      </ReactFlowInternal>
    </Box>
  );
};
