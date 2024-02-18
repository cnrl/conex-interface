import { LibraryItems } from '@excalidraw/excalidraw/types/types';
import { STORAGE_KEYS } from './constants';

export const onLibraryChange = async (items: LibraryItems) => {
  if (!items.length) {
    localStorage.removeItem(STORAGE_KEYS.LOCAL_STORAGE_LIBRARY);
    return;
  }

  const serializedItems = JSON.stringify(items);
  localStorage.setItem(STORAGE_KEYS.LOCAL_STORAGE_LIBRARY, serializedItems);
};
