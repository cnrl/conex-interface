import * as InputPort from './input-port';
import * as NeuronGroup from './neuron-group';
import * as OutputPort from './output-port';

export const nodeTypes = {
  [NeuronGroup.NAME]: NeuronGroup.CustomNode,
  [InputPort.NAME]: InputPort.CustomNode,
  [OutputPort.NAME]: OutputPort.CustomNode,
};
