import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { create } from 'zustand';

interface ExcalidrawAPIStore {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
}

export const useExcalidrawAPIStore = create<ExcalidrawAPIStore>(() => ({
  excalidrawAPI: null,
}));

export const setExcalidrawAPI = (excalidrawAPI: ExcalidrawImperativeAPI) => {
  useExcalidrawAPIStore.setState({ excalidrawAPI });
};
