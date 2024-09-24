import { Controls } from '@xyflow/react';
import { ComponentControl, DrawerControl } from './controls';

export const CustomControls = () => {
  return (
    <Controls>
      <DrawerControl />
      <ComponentControl />
    </Controls>
  );
};
