import { Stack } from '@mui/material';
import { PreviewNodePool } from './custom-node-preview';

export const LibraryItemsPreview = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        position: 'fixed',
        top: 40,
        width: 400,
        borderRadius: 4,
        px: 2,
        py: 1,
        bgcolor: '#f0f0f099',
        left: '50%',
        transform: 'translateX(-50%)',
        alignItems: 'center',
        zIndex: 1,
        userSelect: 'none',
      }}
    >
      <PreviewNodePool />
    </Stack>
  );
};
