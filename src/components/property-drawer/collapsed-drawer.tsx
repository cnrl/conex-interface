import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { IconButton, SvgIcon } from '@mui/material';
import { setPropertyDrawerOpenState } from '../../store/property-drawer-store';

export const CollapsedPropertyDrawer = () => {
  return (
    <IconButton
      sx={{ position: 'fixed', zIndex: 1, top: 0, right: 0, m: 2 }}
      onClick={() => setPropertyDrawerOpenState(true)}
    >
      <SvgIcon component={SettingsRoundedIcon} />
    </IconButton>
  );
};
