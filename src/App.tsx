import { Paper } from '@mui/material';
import { Container as ModalContainer } from 'react-modal-promise';
import { LibraryPreviewManager } from './components/managers/library-preview';
import { PropertyDrawer } from './components/property-drawer';
import { MainFlow } from './components/reactflow';

// todo: make property drawer like modal container manager!!
export const App = () => {
  return (
    <Paper sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}>
      <LibraryPreviewManager />
      <MainFlow />
      <ModalContainer />
      <PropertyDrawer />
    </Paper>
  );
};
