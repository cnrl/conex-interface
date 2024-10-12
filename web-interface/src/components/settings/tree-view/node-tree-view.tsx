import { useShallow } from 'zustand/react/shallow';
import useReactFlowStore from '../../../stores/react-flow';
import { TreeItem } from './tree-item';
import { infoDrawer, drawer } from '../../../stores/app-states';
import { ReactFlowAppNode } from '../../../stores/types.ts';

export const NodeTreeView = () => {
  const nodes = useReactFlowStore(useShallow(state => state.nodes));
  const updateNode = useReactFlowStore(useShallow(state => state.updateNode));
  const selectedNodeID = useReactFlowStore(useShallow(state => state.selectedNodeID));
  const setSelectedNodeID = useReactFlowStore(useShallow(state => state.setSelectedNodeID));
  // console.log(nodes);

  const handleChangeColor = (item: ReactFlowAppNode, color: string) => {
    updateNode(item.id, { ...item.data, color });
  };
  const handleChangeLabel = (item: ReactFlowAppNode, label: string) => {
    updateNode(item.id, { ...item.data, label });
  };
  const handleEdit = (id: string | null) => {
    setSelectedNodeID(id);
    drawer.setOpen(false);
    infoDrawer.setID(id);
  };
  return (
    <TreeItem itemId="node" label="NODES">
      {nodes.map(item => (
        <TreeItem
          key={item.id}
          color={item.data.color}
          itemId={item.id}
          label={item.data.label}
          selected={item.id == selectedNodeID}
          onChangeColor={color => handleChangeColor(item, color)}
          onChangeLabel={label => handleChangeLabel(item, label)}
          onClick={() => setSelectedNodeID(item.id)}
          onEditClick={() => handleEdit(item.id)}
        />
      ))}
    </TreeItem>
  );
};
