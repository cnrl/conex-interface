import SettingsInputComponentRoundedIcon from '@mui/icons-material/SettingsInputComponentRounded';

import { ControlButton } from '@xyflow/react';
import { component } from '../../../stores/app-states';
import { ACTIVE_COLOR_FOR_CONTROL } from '../../constants/colors';

export const ComponentControl = () => {
  const { open } = component.useStore();
  return (
    <ControlButton onClick={() => component.setOpen(!open)}>
      <SettingsInputComponentRoundedIcon sx={open ? { color: ACTIVE_COLOR_FOR_CONTROL } : undefined} />
    </ControlButton>
  );
};
