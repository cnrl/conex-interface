import { Drawer, Paper, Typography } from '@mui/material';
import { St8 } from 'use-st8';

interface BehaviorsDrawerProps {
  drawerSt8: St8<boolean>;
}

export function BehaviorsDrawer({ drawerSt8 }: BehaviorsDrawerProps) {
  return (
    <Drawer anchor="right" open={drawerSt8()} onClose={() => drawerSt8(false)}>
      <Paper sx={{ minWidth: 450, height: 1, p: 1 }}>
        <Typography>Behaviors list</Typography>
      </Paper>
    </Drawer>
  );
}
