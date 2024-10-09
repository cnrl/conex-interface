import { NodeTreeView } from '@components/settings/tree-view/node-tree-view';
import { TreeItem } from '@components/settings/tree-view/tree-item';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

export default function TreeView() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView
        defaultExpandedItems={['grid']}
        slots={{
          expandIcon: AddBoxIcon,
          collapseIcon: IndeterminateCheckBoxIcon,
          endIcon: DisabledByDefaultRoundedIcon,
        }}
      >
        <MuiTreeItem itemId="grid" label="Data Grid">
          <MuiTreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <MuiTreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <MuiTreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
        </MuiTreeItem>

        <MuiTreeItem itemId="pickers" label="Date and Time Pickers">
          <MuiTreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <MuiTreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </MuiTreeItem>
        <MuiTreeItem itemId="charts" label="Charts">
          <MuiTreeItem itemId="charts-community" label="@mui/x-charts" />
        </MuiTreeItem>
        <MuiTreeItem itemId="tree-view" label="Tree View">
          <MuiTreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </MuiTreeItem>
        {/* TODO: setting more action must be added */}
        {/* TODO: nodes color changer must be added, beside node types */}
        {/* TODO: custom style must be added for the NODEs TreeITem  */}
        <NodeTreeView />
        <TreeItem itemId="4" label="History" />
      </SimpleTreeView>
    </Box>
  );
}
