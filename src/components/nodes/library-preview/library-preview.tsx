import { Stack } from '@mui/material';
import { INITIAL_LIBRARY_COMPONENTS } from './constants';

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
        gap: 2,
        alignItems: 'center',
        zIndex: 1,
        userSelect: 'none',
      }}
    >
      <PreviewNodePool />
    </Stack>
  );
};

export const PreviewNodePool = () => {
  return INITIAL_LIBRARY_COMPONENTS.map(library => <library.component key={library.nodeType} />);
};
