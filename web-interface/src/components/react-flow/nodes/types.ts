import * as InputPort from './input-port';
import * as NeuronGroup from './neuron-group';
import * as OutputPort from './output-port';

export type PreviewNodeTypes =
  | 'input'
  | typeof NeuronGroup.NODE_TYPE
  | typeof InputPort.NODE_TYPE
  | typeof OutputPort.NODE_TYPE;

export type NodeBaseTypeData = { label: string; ui: { bgColor: string } };
