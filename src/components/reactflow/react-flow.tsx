import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Box } from '@mui/material';
import { produce } from 'immer';
import { DragEventHandler, useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProps,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './css/reflow-reset.css';
import './css/validation.css';

import { v4 as getUniqueId } from 'uuid';
import { HASH_SLICE } from '../../constants/configs';
import { setPropertyDrawerEdgeId, setPropertyDrawerNodeId } from '../../store/property-drawer-store';
import { PreviewNodeTypes, nodeTypes } from '../nodes';

// TODO: mini map (name, color, toggle-able)
const minimapStyle = { height: 120 };

// TODO: memo
const isValidConnection: ReactFlowProps['isValidConnection'] = connection => {
  console.log(connection);
  return true;
};

// TODO: MainFlow is component viewer and editor, only one component get generated/showed/edited at a time
// TODO: There should be a main-flow manager that pass props, and store the generated component in storage, and call apis!
// TODO: add onNodeContextMenu for menu action handling
export const MainFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();

  const onConnect = useCallback<NonNullable<ReactFlowProps['onConnect']>>(
    params => setEdges(edge => addEdge(params, edge)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onDragOver = useCallback<DragEventHandler<HTMLDivElement>>(event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback<DragEventHandler<HTMLDivElement>>(
    async event => {
      event.preventDefault();
      const nodeType = event.dataTransfer.getData('application/reactflow') as PreviewNodeTypes;

      // check if the dropped element is valid, or no react-flow-instance has been created
      if (typeof nodeType === 'undefined' || !nodeType || !reactFlowInstance) return;
      // let nodeProps = null;
      // try {
      //   nodeProps = await modalManager({ shabe: 'tavalode toe' });
      // } catch (o_O) {
      //   nodeProps = null;
      // }

      const nodeId = getUniqueId();
      setNodes(
        produce(draft => {
          const newNode = {
            id: nodeId,
            type: nodeType,
            position: reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY }),
            data: {
              label: `${nodeType}:${nodeId.slice(0, HASH_SLICE)}`,
              ui: {
                bgcolor: 'crimson',
              },
              // nodeProps,
            },
          };

          draft.push(newNode);
        }),
      );
    },
    [reactFlowInstance],
  );

  // NOTE: 1.you can map and change react edge type based on data stored in the data panel
  return (
    <Box ref={reactFlowWrapper} sx={{ height: 1 }}>
      <ReactFlow
        fitView
        attributionPosition="top-left"
        className="validation"
        edges={edges}
        isValidConnection={isValidConnection}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onEdgeClick={(_event, edge) => setPropertyDrawerEdgeId(edge.id)}
        onEdgesChange={onEdgesChange}
        onInit={setReactFlowInstance}
        onNodeClick={(_event, node) => setPropertyDrawerNodeId(node.id)}
        onNodesChange={onNodesChange}
      >
        <MiniMap pannable zoomable style={minimapStyle} />
        <Controls />
        <Background color="#aaa" gap={16} />
        <Controls>
          <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
            <AutoFixHighIcon />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </Box>
  );
};
