// https://github.com/nomcopter/react-mosaic/tree/master
import { Excalidraw } from '@excalidraw/excalidraw';
import { Stack } from '@mui/material';
import useSt8 from 'use-st8';
import './App.css';
import { BehaviorsDrawer } from './components/behaviours-drawer';
import { CustomizedFooter } from './components/cutomized-footer';

export default function App() {
  // TODO: zustand
  const drawerSt8 = useSt8(false);
  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <Excalidraw>
        <CustomizedFooter drawerSt8={drawerSt8} />
      </Excalidraw>
      <BehaviorsDrawer drawerSt8={drawerSt8} />
    </Stack>
  );
}
