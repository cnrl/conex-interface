import * as InputPort from '../input-port';
import * as NeuronGroup from '../neuron-group';
import * as OutputPort from '../output-port';

export const INITIAL_LIBRARY_COMPONENTS = [
  {
    nodeType: InputPort.NAME,
    component: InputPort.Preview,
  },
  {
    nodeType: OutputPort.NAME,
    component: OutputPort.Preview,
  },
  {
    nodeType: NeuronGroup.NAME,
    component: NeuronGroup.Preview,
  },
];
