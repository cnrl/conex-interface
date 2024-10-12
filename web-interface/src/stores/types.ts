import type { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';

type NodeData = {
  label: string;
  color: string;
};
type AppNode = Node<NodeData>;
type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  selectedNodeID: string | null;

  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  // custom logics, for store managements
  addNode: (nodeType: string, data: NodeData) => void;
  updateNode: (id: AppNode['id'], data: Partial<NodeData>) => void;
  setSelectedNodeID: (id: string | null) => void;
};

export type ReactFlowAppStoreState = AppState;
export type ReactFlowAppNode = AppNode;
