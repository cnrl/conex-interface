import { ReactFlowAppNode } from '@stores/types';
import * as InputPort from './input-port';
import * as NeuronGroup from './neuron-group';
import * as OutputPort from './output-port';

export const nodeTypes = {
  [NeuronGroup.NODE_TYPE]: NeuronGroup.CustomNode,
  [InputPort.NODE_TYPE]: InputPort.CustomNode,
  [OutputPort.NODE_TYPE]: OutputPort.CustomNode,
};

const NODE_DEFAULT_COLORS = {
  [NeuronGroup.NODE_TYPE]: NeuronGroup.DEFAULT_COLOR,
  [InputPort.NODE_TYPE]: InputPort.DEFAULT_COLOR,
  [OutputPort.NODE_TYPE]: OutputPort.DEFAULT_COLOR,
} as const;

export const createNode = ({
  id,
  nodeType,
  data,
}: {
  id: string;
  nodeType: string;
  data: Partial<ReactFlowAppNode['data']>;
}) => {
  // TODO: note it might add custom data (e.g. size, number of ports) to custom node (e.g. ng)
  return {
    type: nodeType,
    data: {
      label: data.label ?? `${nodeType}-${id}`,
      color: data.color || NODE_DEFAULT_COLORS[nodeType as keyof typeof NODE_DEFAULT_COLORS] || 'black',
    },
  };
};
