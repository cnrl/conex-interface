import { create } from 'zustand';

type DrawerStore = { open: boolean };
const useDrawerStore = create<DrawerStore>(() => ({ open: false }));
const setDrawerOpenState: React.Dispatch<React.SetStateAction<boolean>> = open => {
  if (typeof open === 'function') {
    return useDrawerStore.setState({ open: open(useDrawerStore.getState().open) });
  }
  useDrawerStore.setState({ open });
};
export const drawer = {
  useStore: useDrawerStore,
  setOpen: setDrawerOpenState,
};

type ComponentStore = { open: boolean };
const useComponentStore = create<ComponentStore>(() => ({ open: false }));
const setComponentOpenState = (open: boolean) => useComponentStore.setState({ open });

export const component = {
  useStore: useComponentStore,
  setOpen: setComponentOpenState,
};

type MainCmdkStore = { open: boolean };
const useMainCmdkStore = create<MainCmdkStore>(() => ({ open: false }));
const setMainCmdkOpenState: React.Dispatch<React.SetStateAction<boolean>> = open => {
  if (typeof open === 'function') {
    return useMainCmdkStore.setState({ open: open(useMainCmdkStore.getState().open) });
  }
  useMainCmdkStore.setState({ open });
};

export const mainCmdk = {
  useStore: useMainCmdkStore,
  setOpen: setMainCmdkOpenState,
};

type InfoDrawer = { ID: string | null };
const useInfoDrawerStore = create<InfoDrawer>(() => ({ ID: null }));
const setInfoDrawerIDState: React.Dispatch<React.SetStateAction<string | null>> = ID => {
  if (typeof ID === 'function') {
    return useInfoDrawerStore.setState({ ID: ID(useInfoDrawerStore.getState().ID) });
  }
  useInfoDrawerStore.setState({ ID });
};

export const infoDrawer = {
  useStore: useInfoDrawerStore,
  setID: setInfoDrawerIDState,
};
