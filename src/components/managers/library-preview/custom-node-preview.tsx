import { Stack } from '@mui/material';
import { NEURON_GROUP } from '../../../constants';

const onDragStart = (nodeType: PreviewNodeTypes): React.DragEventHandler<HTMLDivElement> => {
  return event => {
    console.log('onDragStart.event', event);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    // const img = new Image();
    // img.src = 'https://picsum.photos/20/';
    // event.dataTransfer.setDragImage(img, 10, 10);
  };
};

export const NeuronGroupNodePreview = () => {
  return (
    <Stack
      draggable
      sx={{
        display: 'inline-flex',
        borderRadius: '50%',
        width: '3rem',
        height: '3rem',
        background: '#ff0072',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        cursor: 'grab',
      }}
      onDragStart={onDragStart(NEURON_GROUP)}
    >
      ng
    </Stack>
  );
};

const INITIAL_LIBRARY_COMPONENTS = [
  {
    nodeType: NEURON_GROUP,
    component: NeuronGroupNodePreview,
  },
];

type PreviewNodeTypes = 'input' | typeof NEURON_GROUP;
export const PreviewNodePool = () => {
  return (
    <>
      {INITIAL_LIBRARY_COMPONENTS.map(library => (
        <library.component key={library.nodeType} />
      ))}
    </>
  );
};
