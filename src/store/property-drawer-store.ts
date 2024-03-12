import { create } from 'zustand';

type PropertyDrawerStore = { open: boolean };
export const usePropertyDrawerStore = create<PropertyDrawerStore>(() => ({ open: false }));
export const setPropertyDrawerOpenState = (open: boolean) => {
  usePropertyDrawerStore.setState({ open });
};

interface PropertyDrawerElementStore {
  nodeId: string | undefined;
  edgeId: string | undefined;
}

export const usePropertyDrawerElementStore = create<PropertyDrawerElementStore>(() => ({
  nodeId: undefined,
  edgeId: undefined,
}));

export const setPropertyDrawerNodeId = (nodeId?: string) => {
  usePropertyDrawerElementStore.setState({ nodeId, edgeId: undefined });
};
export const setPropertyDrawerEdgeId = (edgeId?: string) => {
  // TODO: check is dirty and alert for continuing action process
  usePropertyDrawerElementStore.setState({ edgeId, nodeId: undefined });
};

export const clearPropertyDrawerStore = () => {
  usePropertyDrawerElementStore.setState(usePropertyDrawerElementStore.getInitialState());
};

// const store = createStore(
//   persist(() => ({}), {
//     name: 'store-state',
//     storage: {
//       async getItem(name: string): Promise<StorageValue<unknown>> {
//         // return //get from storage however you want
//         return;
//       },
//       async setItem(name: string, storageValue: StorageValue<unknown>): Promise<void> {
//         // set in storage however you want
//       },
//       async removeItem(name: string): Promise<void> {
//         // remove/delete from storage however you want
//       },
//     },
//   }),
// );
