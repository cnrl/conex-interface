import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeselectRoundedIcon from '@mui/icons-material/DeselectRounded';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { produce } from 'immer';
import { useReactFlow } from 'reactflow';
import { HASH_SLICE } from '../../constants/configs';
import {
  clearPropertyDrawerStore,
  setPropertyDrawerOpenState,
  usePropertyDrawerElementStore,
  usePropertyDrawerStore,
} from '../../store/property-drawer-store';

const DRAWER_WIDTH = 300;
export const ExpandedPropertyDrawer = () => {
  const { nodeId, edgeId } = usePropertyDrawerElementStore();
  const currentReactFlow = useReactFlow();

  const hasSelectedElement = !!(nodeId || edgeId);

  return (
    <Drawer
      anchor="right"
      open={usePropertyDrawerStore().open}
      variant="persistent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          p: 1,
        },
      }}
    >
      <Stack sx={{ height: 1, gap: 1 }}>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
          {hasSelectedElement && (
            <IconButton disableRipple onClick={clearPropertyDrawerStore}>
              <ClearRoundedIcon />
            </IconButton>
          )}

          <Typography
            align="center"
            sx={{ flexBasis: '100%', fontFamily: 'monospace', color: theme => theme.palette.grey[600] }}
            variant="body1"
          >
            {nodeId && `node:${nodeId.slice(0, HASH_SLICE)}`}
            {edgeId && `edge:${edgeId.slice(0, HASH_SLICE)}`}
          </Typography>

          <IconButton disableRipple onClick={() => setPropertyDrawerOpenState(false)}>
            <ChevronRightRoundedIcon />
          </IconButton>
        </Stack>

        <Stack sx={{ flexGrow: 1 }}>
          {!hasSelectedElement && (
            <Typography
              sx={{
                height: 1,
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: theme => theme.palette.grey[600],
                svg: {
                  color: theme => theme.palette.grey[800],
                },
              }}
            >
              <DeselectRoundedIcon />
              <span>
                Please select
                <kbd>node</kbd>
                or
                <kbd>edge</kbd>
              </span>
            </Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          onClick={() => {
            if (nodeId) {
              currentReactFlow.setNodes(
                produce(draft => {
                  const node = draft.find(({ id }) => id === nodeId);
                  if (!node) return;
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  node.data.label += '⭐️';
                  node.data.something = 'new-thing';
                }),
              );
            }
          }}
        >
          Update
        </Button>
      </Stack>
    </Drawer>
  );
};
