import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { ToolType } from '@excalidraw/excalidraw/types/types';

const isLinearElementType = (elementType: ExcalidrawElement['type'] | ToolType | 'custom'): boolean => {
  return (
    elementType === 'arrow' || elementType === 'line' // || elementType === "freedraw"
  );
};

type NonDeleted<TElement extends ExcalidrawElement> = TElement & {
  isDeleted: boolean;
};

export const getNonDeletedElements = <T extends ExcalidrawElement>(elements: readonly T[]) =>
  elements.filter(element => !element.isDeleted) as readonly NonDeleted<T>[];

export const isNonDeletedElement = <T extends ExcalidrawElement>(element: T): element is NonDeleted<T> =>
  !element.isDeleted;

export const cleanElements = (elements: readonly ExcalidrawElement[]): ExcalidrawElement[] =>
  getNonDeletedElements(elements).map(element =>
    isLinearElementType(element.type) ? { ...element, lastCommittedPoint: null } : element,
  );
