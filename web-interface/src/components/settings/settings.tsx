import { Box, Button, styled, TextField, Typography } from '@mui/material';
import { useStateToggleShortcutOn } from '../../hooks/use-shortcut';
import { drawer, infoDrawer } from '../../stores/app-states';
import { shortcuts } from '../constants/shortcuts';
import ResizableDrawer from './resizable-drawer';
import TreeView from './tree-view/tree-view';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomForm from '../hookForm/form';
import { fullSizeStyle } from '../../styles/BaseComponents';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';
import useReactFlowStore from '../../stores/react-flow';
import { useShallow } from 'zustand/react/shallow';
import IosShareIcon from '@mui/icons-material/IosShare';
import exportData from '../constants/export';
import { useEffect, useState } from 'react';
import { formData } from '../hookForm/formData';

interface StackProps {
  threerows?: boolean;
}

const Stack = styled(Box)<StackProps>(({ threerows = false }) => ({
  display: 'grid',
  gridTemplateRows: threerows ? '40px calc(100% - 100px) 40px' : '40px calc(100% - 50px)',
  gridTemplateColumns: '100%',
  gap: '10px',
  height: '100%',
}));

export const Settings = () => {
  useStateToggleShortcutOn(shortcuts.drawer, drawer.setOpen);
  const nodes = useReactFlowStore(useShallow(state => state.nodes));
  const updateNode = useReactFlowStore(useShallow(state => state.updateNode));
  const id = infoDrawer.useStore().ID;
  const [nodeFields, setNodeFields] = useState([]);

  const handleExport = nodes => {
    exportData(nodes);
  };

  const onSubmit = data => {
    if (id) updateNode(id, { ...nodes.filter(item => item.id == id)[0]?.data, ...data });
  };

  useEffect(() => {
    const newForm = JSON.parse(JSON.stringify(formData.ng));

    if (id) {
      const nodeData = nodes.filter(item => item.id == id)[0]?.data;
      for (const item in nodeData) {
        if (newForm[item]) {
          newForm[item].value = nodeData[item];
        }
      }
      setNodeFields(Object.values(newForm));
    }
  }, [id, nodes]);

  return (
    <>
      <ResizableDrawer
        anchor="right"
        open={drawer.useStore().open}
        variant="persistent"
        sx={{
          flexShrink: 0,
          display: 'flex',
          userSelect: 'none',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            p: 1,
          },
        }}
      >
        <Stack threerows>
          <Box sx={{ justifyContent: 'end', alignItems: 'center', display: 'flex' }}>
            <Button
              endIcon={<ClearTwoToneIcon />}
              onClick={() => {
                drawer.setOpen(false);
              }}
            >
              Close
            </Button>
          </Box>
          <TreeView />

          <Box sx={{ ...fullSizeStyle, justifyContent: 'end', display: 'flex' }}>
            <Button
              endIcon={<IosShareIcon fontSize="small" />}
              type="submit"
              variant="contained"
              onClick={() => handleExport(nodes)}
            >
              Export
            </Button>
          </Box>
        </Stack>
      </ResizableDrawer>
      <ResizableDrawer
        anchor="right"
        open={!!infoDrawer.useStore().ID}
        variant="persistent"
        sx={{
          flexShrink: 0,
          display: 'flex',
          userSelect: 'none',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            p: 1,
          },
        }}
      >
        <Stack>
          <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
            <Typography variant="h5">{infoDrawer.useStore().ID}:</Typography>
            <Button
              endIcon={<ArrowForwardIcon />}
              onClick={() => {
                drawer.setOpen(true);
                infoDrawer.setID(null);
              }}
            >
              Back
            </Button>
          </Box>
          <Box sx={{ ...fullSizeStyle }}>
            <CustomForm fields={nodeFields} id={infoDrawer.useStore().ID} onSubmit={onSubmit} />
          </Box>
        </Stack>
      </ResizableDrawer>
    </>
  );
};
