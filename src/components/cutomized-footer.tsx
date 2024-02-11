import { Footer } from '@excalidraw/excalidraw';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import { Box, IconButton, SvgIcon } from '@mui/material';
import { St8 } from 'use-st8';

interface CustomizedFooterProps {
  drawerSt8: St8<boolean>;
}

export function CustomizedFooter({ drawerSt8 }: CustomizedFooterProps) {
  return (
    <Footer>
      <Box sx={{ px: 1 }}>
        <IconButton
          disableRipple
          sx={{
            width: 'var(--lg-button-size)',
            height: 'var(--lg-button-size)',
            backgroundColor: 'var(--color-surface-low)',
            borderRadius: 'var(--border-radius-lg)',
          }}
          onClick={() => drawerSt8(true)}
        >
          <SvgIcon
            component={!drawerSt8() ? KeyboardDoubleArrowLeftRoundedIcon : KeyboardDoubleArrowRightRoundedIcon}
            sx={{ fontSize: 'var(--lg-icon-size)', color: 'var(--icon-fill-color)' }}
          />
        </IconButton>
      </Box>
    </Footer>
  );
}
