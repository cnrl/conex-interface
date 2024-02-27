import { Paper } from '@mui/material';
import { Container as ModalContainer } from 'react-modal-promise';
import { LibraryPreviewManager } from './components/managers/library-preview';
import { MainFlow } from './components/reactflow';

export const App = () => {
  return (
    <Paper sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}>
      <LibraryPreviewManager />
      <MainFlow />
      <ModalContainer />
    </Paper>
  );
};
