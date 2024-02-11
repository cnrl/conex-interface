import { AppState } from '@excalidraw/excalidraw/types/types';
import { get, keys } from 'lodash/fp';

export function getSelectedElements(appState: Readonly<AppState> | undefined) {
  return keys(get('selectedElementIds', appState));
}
