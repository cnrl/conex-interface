import { useStateToggleShortcutOn } from '../../hooks/use-shortcut';
import { drawer } from '../../stores/app-states';
import { shortcuts } from '../constants/shortcuts';
import { DRAWER_WIDTH } from './constants';
import ResizableDrawer from './resizable-drawer';
import TreeView from './tree-view/tree-view';

export const Settings = () => {
  useStateToggleShortcutOn(shortcuts.drawer, drawer.setOpen);

  return (
    <ResizableDrawer
      anchor="right"
      open={drawer.useStore().open}
      variant="persistent"
      sx={{
        flexShrink: 0,
        userSelect: 'none',
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          p: 1,
        },
      }}
    >
      <TreeView />
    </ResizableDrawer>
  );
};
