import SettingsIcon from '@mui/icons-material/Settings';

import { ControlButton } from '@xyflow/react';
import { drawer } from '../../../stores/app-states';
import { ACTIVE_COLOR_FOR_CONTROL } from '../../constants/colors';

// assign shortcut to close and open
export const DrawerControl = () => {
  const { open } = drawer.useStore();
  return (
    <ControlButton onClick={() => drawer.setOpen(!open)}>
      <SettingsIcon sx={open ? { color: ACTIVE_COLOR_FOR_CONTROL } : undefined} />
    </ControlButton>
  );
};
