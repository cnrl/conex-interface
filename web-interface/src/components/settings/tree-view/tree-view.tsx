import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { NodeTreeView } from './node-tree-view';
import useReactFlowStore from '../../../stores/react-flow';
import { useShallow } from 'zustand/react/shallow';

export default function TreeView() {
  const selectedNodeID = useReactFlowStore(useShallow(state => state.selectedNodeID));
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView
        disableSelection
        defaultExpandedItems={['grid']}
        selectedItems={selectedNodeID}
        slots={{
          expandIcon: AddBoxIcon,
          collapseIcon: IndeterminateCheckBoxIcon,
          endIcon: DisabledByDefaultRoundedIcon,
        }}
      >
        {/* TODO: setting more action must be added */}
        {/* TODO: nodes color changer must be added, beside node types */}
        {/* TODO: custom style must be added for the NODEs TreeITem  */}
        <NodeTreeView />
      </SimpleTreeView>
    </Box>
  );
}
