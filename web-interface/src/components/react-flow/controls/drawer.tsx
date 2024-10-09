import SettingsIcon from '@mui/icons-material/Settings';

import { ACTIVE_COLOR_FOR_CONTROL } from '@components/constants/colors';
import { drawer } from '@stores/app-states';
import { ControlButton } from '@xyflow/react';

// assign shortcut to close and open
export const DrawerControl = () => {
  const { open } = drawer.useStore();
  return (
    <ControlButton onClick={() => drawer.setOpen(!open)}>
      <SettingsIcon sx={open ? { color: ACTIVE_COLOR_FOR_CONTROL } : undefined} />
    </ControlButton>
  );
};
