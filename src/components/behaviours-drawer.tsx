import { ExcalidrawArrowElement } from '@excalidraw/excalidraw/types/element/types';
import { Button, Drawer, Paper, Typography } from '@mui/material';
import { produce } from 'immer';
import { St8 } from 'use-st8';
import { useExcalidrawAPIStore } from '../store/excadraw-api-state';
import { getSelectedElements } from '../utils';
import { JsonFormComponent } from './json-form';

interface BehaviorsDrawerProps {
  drawerSt8: St8<boolean>;
}

export function BehaviorsDrawer({ drawerSt8 }: BehaviorsDrawerProps) {
  const { excalidrawAPI } = useExcalidrawAPIStore();

  return (
    <Drawer anchor="right" open={drawerSt8()} onClose={() => drawerSt8(false)}>
      <Paper
        sx={{
          minWidth: 450,
          height: 1,
          p: 1,
          maxWidth: '50vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <JsonFormComponent />
        <Typography>Behaviors list</Typography>
        <kbd>
          type<kbd>submit</kbd>
        </kbd>
        <Button
          onClick={() => {
            const customData: CustomData = {
              informative: { name: 'name@patch' },
              behaviors: [{ type: 'SOME_BEH_1', init: { size: [128, 128] } }],
            };

            const elements = produce(excalidrawAPI?.getSceneElements(), draft => {
              const appState = excalidrawAPI?.getAppState();
              const selectedIds = getSelectedElements(appState);
              if (!draft) return;
              draft.forEach(element => {
                if (!selectedIds.includes(element.id)) return;
                element.customData = customData;
                // element.locked = false;
              });
            });
            // Add custom configured behaviors submitted from dynamic created form
            excalidrawAPI?.updateScene({ elements });
          }}
        >
          <Typography>Add custom Data</Typography>
        </Button>

        <Button
          onClick={() => {
            const elements = excalidrawAPI?.getSceneElements();
            if (!elements) return;

            const connections = (elements.filter(element => element.type === 'arrow') as ExcalidrawArrowElement[]).map(
              element => ({
                start: element.startBinding?.elementId,
                end: element.endBinding?.elementId,
              }),
            );

            console.log({ connections });
          }}
        >
          <Typography>Connect Synapse groups</Typography>
        </Button>
      </Paper>
    </Drawer>
  );
}
