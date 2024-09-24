import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { produce } from 'immer';
import { create } from 'zustand';
import { createNode } from '../components/react-flow/nodes';
import { ReactFlowAppStoreState } from './types';

const useReactFlowStore = create<ReactFlowAppStoreState>()((set, get) => ({
  nodes: [
    {
      id: '1',
      type: 'i',
      data: { label: 'Input', color: '#7cb342' },
      position: { x: 250, y: 25 },
    },

    {
      id: '2',
      type: 'ng',
      data: { label: 'Default', color: 'crimson' },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'o',
      data: { label: 'Output', color: 'blue' },
      position: { x: 250, y: 250 },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
  ],
  onNodesChange: changes => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: changes => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: connection => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: nodes => {
    set({ nodes });
  },
  setEdges: edges => {
    set({ edges });
  },

  // Custom logics
  addNode: (nodeType, data) => {
    set({
      nodes: produce(get().nodes, draft => {
        const id = `${nodeType}-${draft.length + 1}`;
        draft.push({
          id,
          position: { x: 250, y: 250 }, // TODO: implement random generator on free space
          ...createNode({ nodeType, data, id }),
        });
      }),
    });
  },

  updateNode: (id, data) => {
    set({
      nodes: produce(get().nodes, draft => {
        const node = draft.find(n => n.id === id);
        // can also validate see: https://reactflow.dev/learn/advanced-use/state-management
        if (node) {
          node.data = { ...node.data, ...data };
        }
      }),
    });
  },
}));

export default useReactFlowStore;
