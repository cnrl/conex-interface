// https://github.com/nomcopter/react-mosaic/tree/master
import { Excalidraw } from '@excalidraw/excalidraw';
import { Stack } from '@mui/material';
import useSt8 from 'use-st8';
import './App.css';
import { BehaviorsDrawer } from './components/behaviours-drawer';
import { CustomizedFooter } from './components/cutomized-footer';
import { setExcalidrawAPI, useExcalidrawAPIStore } from './store/excadraw-api-state';
import { onLibraryChange } from './utils/excalidraw-utils';
import { getSelectedElements } from './utils/get-attrs';

export default function App() {
  // TODO: zustand
  const drawerSt8 = useSt8(false);
  const { excalidrawAPI } = useExcalidrawAPIStore();

  return (
    <Stack direction="row" sx={{ height: 1 }}>
      <Excalidraw gridModeEnabled excalidrawAPI={setExcalidrawAPI} onLibraryChange={onLibraryChange}>
        <CustomizedFooter
          drawerSt8={drawerSt8}
          transformExcalidrawStateToPythonState={() => {
            const appState = excalidrawAPI?.getAppState();

            console.log({
              elements: excalidrawAPI?.getSceneElements(),
              appState,
              selectedIds: getSelectedElements(appState),
            });
          }}
        />
      </Excalidraw>
      <BehaviorsDrawer drawerSt8={drawerSt8} />
    </Stack>
  );
}
