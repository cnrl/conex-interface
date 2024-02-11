import { Footer } from '@excalidraw/excalidraw';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { Box, IconButton, SvgIcon } from '@mui/material';
import { St8 } from 'use-st8';

interface CustomizedFooterProps {
  drawerSt8: St8<boolean>;
  transformExcalidrawStateToPythonState: () => void;
}

export function CustomizedFooter({ drawerSt8, transformExcalidrawStateToPythonState }: CustomizedFooterProps) {
  return (
    <Footer>
      <Box>
        <IconButton
          disableRipple
          sx={{
            width: 'var(--lg-button-size)',
            height: 'var(--lg-button-size)',
            backgroundColor: 'var(--color-surface-low)',
            borderRadius: 'var(--border-radius-lg)',
            marginInlineStart: '0.6em',
          }}
          onClick={() => drawerSt8(true)}
        >
          <SvgIcon
            component={!drawerSt8() ? KeyboardDoubleArrowLeftRoundedIcon : KeyboardDoubleArrowRightRoundedIcon}
            sx={{ fontSize: 'var(--lg-icon-size)', color: 'var(--icon-fill-color)' }}
          />
        </IconButton>

        <IconButton
          sx={{
            width: 'var(--lg-button-size)',
            height: 'var(--lg-button-size)',
            backgroundColor: 'var(--color-surface-low)',
            borderRadius: 'var(--border-radius-lg)',
            marginInlineStart: '0.3em',
          }}
          onClick={transformExcalidrawStateToPythonState}
        >
          <SvgIcon
            component={SyncRoundedIcon}
            sx={{ fontSize: 'var(--lg-icon-size)', color: 'var(--icon-fill-color)' }}
          />
        </IconButton>
      </Box>
    </Footer>
  );
}
