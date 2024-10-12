import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import { Stack, SvgIcon } from '@mui/material';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { ReactFlowAppNode, ReactFlowAppStoreState } from '../../../stores/types';
import useReactFlowStore from '../../../stores/react-flow';
import { useShallow } from 'zustand/react/shallow';
import { drawer, infoDrawer } from '../../../stores/app-states';

export const NODE_TYPE = 'o';
export const DEFAULT_COLOR = '#f4511e';

const selector = (state: ReactFlowAppStoreState) => ({
  selectedNodeID: state.selectedNodeID,
  setSelectedNodeID: state.setSelectedNodeID,
});

export const CustomNode = ({ id, data }: NodeProps<ReactFlowAppNode>) => {
  const { selectedNodeID, setSelectedNodeID } = useReactFlowStore(useShallow(selector));

  return (
    <>
      <Stack
        id={id}
        sx={{
          p: 1,
          borderRadius: 2,
          width: '4em',
          height: '2em',
          backgroundColor: data.color,
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '0.6rem',
          color: '#fff',
          boxShadow: selectedNodeID == id ? '10px 5px 5px gray' : null,
        }}
        onClick={() => setSelectedNodeID(id)}
        onDoubleClick={() => {
          drawer.setOpen(false);
          infoDrawer.setID(id);
        }}
      >
        <SvgIcon component={FirstPageRoundedIcon} sx={{ fontSize: '1rem' }} />
        {data.label}
      </Stack>
      <Handle position={Position.Left} type="source" />
    </>
  );
};
