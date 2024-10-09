import { TreeItem } from '@components/settings/tree-view/tree-item';
import useReactFlowStore from '@stores/react-flow';
import { useShallow } from 'zustand/react/shallow';

export const NodeTreeView = () => {
  const nodes = useReactFlowStore(useShallow(state => state.nodes));
  console.log(nodes);

  return (
    <TreeItem itemId="node" label="NODES">
      {nodes.map(item => (
        <TreeItem key={item.id} color={item.data.color} itemId={item.id} label={item.data.label} />
      ))}
    </TreeItem>
  );
};
