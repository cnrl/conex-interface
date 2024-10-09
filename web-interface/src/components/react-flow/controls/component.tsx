import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';

import { ACTIVE_COLOR_FOR_CONTROL } from '@components/constants/colors';
import { component } from '@stores/app-states';
import { ControlButton } from '@xyflow/react';

export const ComponentControl = () => {
  const { open } = component.useStore();
  return (
    <ControlButton onClick={() => component.setOpen(!open)}>
      <SettingsInputComponentRoundedIcon sx={open ? { color: ACTIVE_COLOR_FOR_CONTROL } : undefined} />
    </ControlButton>
  );
};
