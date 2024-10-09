import { shortcuts } from '@components/constants/shortcuts';
import { DRAWER_WIDTH } from '@components/settings/constants';
import ResizableDrawer from '@components/settings/resizable-drawer';
import TreeView from '@components/settings/tree-view/tree-view';
import { useStateToggleShortcutOn } from '@hooks/use-shortcut';
import { drawer } from '@stores/app-states';

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
