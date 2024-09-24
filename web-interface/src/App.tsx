import { Paper } from '@mui/material';
import { MainCommandPalette } from './components/react-cmdk/react-cmdk';
import { ReactFlow } from './components/react-flow';
import { Settings } from './components/settings';

export const App = () => {
  return (
    <Paper sx={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1 }}>
      <ReactFlow />
      <MainCommandPalette />
      <Settings />
    </Paper>
  );
};
