import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import DeselectRoundedIcon from '@mui/icons-material/DeselectRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Drawer from '@mui/material/Drawer';
import { useReactFlow } from 'reactflow';
import { Behaviors, useBehaviors } from '../../api/conex';
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
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormBuilder } from '../form-builder';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DRAWER_WIDTH = 300;
export const ExpandedPropertyDrawer = () => {
  const { nodeId, edgeId } = usePropertyDrawerElementStore();
  const currentReactFlow = useReactFlow();

  const hasSelectedElement = !!(nodeId || edgeId);

  const { data: behaviors } = useBehaviors({ enabled: hasSelectedElement });

  // todo: get default value from the api
  // todo: reset the value on api value change
  const element = !hasSelectedElement
    ? null
    : (nodeId ? currentReactFlow.getNodes : currentReactFlow.getEdges)().find(({ id }) => id === nodeId);

  const [optionsValue, setOptionsValue] = useState<Behaviors[]>([]);
  const elementBehaviors = element?.data.nodeBehaviors;

  const { control, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onSubmit',

    defaultValues: elementBehaviors,
  });

  useEffect(() => {
    if (!elementBehaviors) {
      setOptionsValue([]);
      return;
    }
    // eslint-disable-next-line no-prototype-builtins
    const defaultOptions = behaviors?.filter(behavior => elementBehaviors.hasOwnProperty(behavior.key));
    if (defaultOptions) setOptionsValue(defaultOptions);
    reset(elementBehaviors);
  }, [behaviors, elementBehaviors, hasSelectedElement, reset, watch]);

  console.log(formState);

  // todo: add Resetting mechanism with save alert
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
      <Stack
        component="form"
        sx={{ height: 1, gap: 1 }}
        onSubmit={handleSubmit((data, event) => {
          event?.preventDefault();
          console.log({ hasSelectedElement });
          if (!hasSelectedElement) return;

          currentReactFlow.setNodes(
            produce(draft => {
              const node = draft.find(({ id }) => id === nodeId);
              if (!node) return;

              // Todo: get name from user (always)
              // Todo: add color section so user can change ui (color picker)
              // node.data.label = '⭐️';
              console.log({ node });
              node.data.nodeBehaviors = data;
              return draft;
            }),
          );
          console.log('update node', nodeId);
          console.log(currentReactFlow.getNodes().find(({ id }) => id === nodeId));
          console.log({ formState });

          // clear
          setOptionsValue([]);
          clearPropertyDrawerStore();
          // setPropertyDrawerOpenState(false);
          reset();
        })}
      >
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
              disableCloseOnSelect
              multiple
              getOptionLabel={option => option.key}
              isOptionEqualToValue={(option, value) => option.key === value.key}
              renderInput={params => <TextField {...params} label="Behaviors" placeholder="Behaviors" />}
              size="small"
              value={optionsValue}
              options={
                behaviors?.filter(({ type }) => type === (nodeId ? 'neurons' : edgeId ? 'synapses' : null)) ?? []
              }
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} checkedIcon={checkedIcon} icon={icon} style={{ marginRight: 8 }} />
                  <Typography variant="caption">{option.key}</Typography>
                </li>
              )}
              onChange={(_event, options) => void setOptionsValue(options)}
            />
          )}

          {hasSelectedElement &&
            optionsValue?.map(option => (
              <Accordion key={option.key} disableGutters>
                <AccordionSummary aria-controls="panel1-content" expandIcon={<ExpandMoreIcon />} id="panel1-header">
                  <Typography variant="caption">🟥 {option.key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormBuilder control={control} fields={option.parameters} name={option.key} />
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>

        <Button type="submit" variant="contained">
          Update
        </Button>
      </Stack>
    </Drawer>
  );
};
