import { CollapsedPropertyDrawer } from './collapsed-drawer';
import { ExpandedPropertyDrawer } from './expanded-drawer';

export const PropertyDrawer = () => {
  return (
    <>
      <ExpandedPropertyDrawer />
      <CollapsedPropertyDrawer />
    </>
  );
};
