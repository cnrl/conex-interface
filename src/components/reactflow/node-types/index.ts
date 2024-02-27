import { INPUT_TAG, NEURON_GROUP, OUTPUT_TAG } from '../../../constants';
import { InputPortNode } from './input-port';
import { NeuronGroupNode } from './neuron-group';
import { OutputPortNode } from './output-port';

export const nodeTypes = {
  [NEURON_GROUP]: NeuronGroupNode,
  [INPUT_TAG]: InputPortNode,
  [OUTPUT_TAG]: OutputPortNode,
};
