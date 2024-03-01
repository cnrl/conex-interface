import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeselectRoundedIcon from '@mui/icons-material/DeselectRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Drawer from '@mui/material/Drawer';
import { produce } from 'immer';
import { useReactFlow } from 'reactflow';
import { useBehaviors } from '../../api/conex';
import { HASH_SLICE } from '../../constants/configs';
import {
  clearPropertyDrawerStore,
  setPropertyDrawerOpenState,
  usePropertyDrawerElementStore,
  usePropertyDrawerStore,
} from '../../store/property-drawer-store';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DRAWER_WIDTH = 300;
export const ExpandedPropertyDrawer = () => {
  const { nodeId, edgeId } = usePropertyDrawerElementStore();
  const currentReactFlow = useReactFlow();

  const { data: behaviors } = useBehaviors();

  const hasSelectedElement = !!(nodeId || edgeId);

  // todo: get default value from the api
  // todo: reset the value on api value change
  const [optionsValue, setOptionsValue] = useState<string[]>([]);

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

        <Stack sx={{ flexGrow: 1, overflow: 'auto', padding: 0.5 }}>
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

          {hasSelectedElement && (
            <Autocomplete
              multiple
              size="small"
              options={
                behaviors
                  ?.filter(({ type }) => type === (nodeId ? 'neurons' : edgeId ? 'synapses' : null))
                  .map(beh => beh.key) ?? []
              }
              onChange={(_event, options) => void setOptionsValue(options)}
              value={optionsValue}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  <Typography variant="caption">{option}</Typography>
                </li>
              )}
              renderInput={params => <TextField {...params} label="Behaviors" placeholder="Behaviors" />}
            />
          )}

          {hasSelectedElement &&
            optionsValue?.map(option => (
              <Accordion key={option} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                  <Typography variant="caption">🟥 {option}</Typography>
                </AccordionSummary>
                <AccordionDetails>JsonForm for {option}</AccordionDetails>
              </Accordion>
            ))}
        </Stack>

        <Button
          variant="contained"
          onClick={() => {
            if (nodeId) {
              currentReactFlow.setNodes(
                produce(draft => {
                  const node = draft.find(({ id }) => id === nodeId);
                  if (!node) return;

                  const nodeBehaviors = Object.fromEntries(optionsValue.map(key => [key, { key }]));

                  // Todo: get name from user (always)
                  // Todo: add color section so user can change ui (color picker)
                  // node.data.label = '⭐️';
                  node.data.nodeBehaviors = nodeBehaviors;
                }),
              );
              console.log('update node', nodeId);
              console.log(currentReactFlow.getNodes().find(({ id }) => id === nodeId));
            }
          }}
        >
          Update
        </Button>
      </Stack>
    </Drawer>
  );
};
