import * as InputPort from './input-port';
import * as NeuronGroup from './neuron-group';
import * as OutputPort from './output-port';

export type PreviewNodeTypes = 'input' | typeof NeuronGroup.NAME | typeof InputPort.NAME | typeof OutputPort.NAME;

export type NodeBaseTypeData = { label: string; ui: { bgColor: string } };
