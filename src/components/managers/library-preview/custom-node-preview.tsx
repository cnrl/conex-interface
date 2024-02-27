import GrainRoundedIcon from '@mui/icons-material/GrainRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import { Stack, Tooltip } from '@mui/material';
import { INPUT_TAG, NEURON_GROUP, OUTPUT_TAG } from '../../../constants';

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

// TODO: move coloring to theme
export const NeuronGroupNodePreview = () => {
  return (
    <Tooltip title="Neuron group">
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
        <GrainRoundedIcon />
      </Stack>
    </Tooltip>
  );
};

export const InputTagNodePreview = () => {
  return (
    <Tooltip title="Output tag">
      <Stack
        draggable
        sx={{
          display: 'inline-flex',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          background: '#7cb342',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'grab',
        }}
        onDragStart={onDragStart(INPUT_TAG)}
      >
        <InputRoundedIcon />
      </Stack>
    </Tooltip>
  );
};
export const OutputTagNodePreview = () => {
  return (
    <Tooltip title="Output tag">
      <Stack
        draggable
        sx={{
          display: 'inline-flex',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          background: '#f4511e',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'grab',
        }}
        onDragStart={onDragStart(OUTPUT_TAG)}
      >
        <OutputRoundedIcon />
      </Stack>
    </Tooltip>
  );
};

const INITIAL_LIBRARY_COMPONENTS = [
  {
    nodeType: INPUT_TAG,
    component: InputTagNodePreview,
  },
  {
    nodeType: NEURON_GROUP,
    component: NeuronGroupNodePreview,
  },
  {
    nodeType: OUTPUT_TAG,
    component: OutputTagNodePreview,
  },
];

type PreviewNodeTypes = 'input' | typeof NEURON_GROUP | typeof INPUT_TAG | typeof OUTPUT_TAG;
export const PreviewNodePool = () => {
  return (
    <>
      {INITIAL_LIBRARY_COMPONENTS.map(library => (
        <library.component key={library.nodeType} />
      ))}
    </>
  );
};
