import { INPUT_TAG, NEURON_GROUP, OUTPUT_TAG } from '../../../constants';
import { InputTagNode } from './input-tag';
import { NeuronGroupNode } from './neuron-group';
import { OutputTagNode } from './output-tag';

export const nodeTypes = {
  [NEURON_GROUP]: NeuronGroupNode,
  [INPUT_TAG]: InputTagNode,
  [OUTPUT_TAG]: OutputTagNode,
};
