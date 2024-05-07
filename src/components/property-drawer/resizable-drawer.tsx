import { Box, DrawerProps } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useCallback, useState } from 'react';

export const defaultDrawerWidth = 240;
const minDrawerWidth = 300;
const maxDrawerWidth = 500;

export default function CustomDrawer({ children, sx, ...props }: DrawerProps) {
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e: any) => {
    const newWidth = document.body.clientWidth - e.clientX - document.body.clientLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  return (
    <Drawer
      PaperProps={{ style: { width: drawerWidth } }}
      variant="permanent"
      sx={{
        drawer: { flexShrink: 0 },
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: '5px',
          cursor: 'ew-resize',
          padding: '4px 0 0',
          borderTop: '1px solid #ddd',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: '#f4f7f9',
        }}
        onMouseDown={() => {
          document.addEventListener('mouseup', handleMouseUp, true);
          document.addEventListener('mousemove', handleMouseMove, true);
        }}
      />
      {children}
    </Drawer>
  );
}
