import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import {
  useTreeItem2 as useTreeItem,
  UseTreeItem2Parameters as UseTreeItemParameters,
} from '@mui/x-tree-view/useTreeItem2';
import clsx from 'clsx';
import { omit, pick } from 'lodash/fp';
import * as React from 'react';
import { RESET_STYLE_TREE_VIEW } from './constants';
import { MoreSettings } from './more-settings';
import * as components from './styled-components';

interface StyledTreeItemProps extends Omit<UseTreeItemParameters, 'rootRef'>, React.HTMLAttributes<HTMLLIElement> {
  moreSettingProps?: any; // for more setting menu function calls
}

export const TreeItem = React.forwardRef(function TreeItem(
  props: StyledTreeItemProps,
  rootRef: React.Ref<HTMLLIElement>,
) {
  // NOTE: Select out all child StyledTreeItemProps from props
  const { itemId, children, moreSettingProps, ...other } = props;
  const logicProps = ['id', 'itemId', 'children', 'label', 'disabled'] as const;
  const bypassedProps = omit(logicProps, other);
  const { status, ...treeItem } = useTreeItem({ ...pick(logicProps, props), rootRef });

  return (
    <components.TreeItemProvider itemId={itemId}>
      <components.TreeItemRoot {...treeItem.getRootProps({ ...bypassedProps, style: RESET_STYLE_TREE_VIEW })}>
        <components.TreeItemContent
          {...treeItem.getContentProps({
            className: clsx('content', {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
          })}
        >
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', pr: 0 }}>
            <components.TreeItemIconContainer {...treeItem.getIconContainerProps()}>
              <TreeItem2Icon status={status} />
            </components.TreeItemIconContainer>
            <Typography
              {...treeItem.getLabelProps({
                variant: 'body2',
                sx: { display: 'flex', fontWeight: 'inherit', flexGrow: 1 },
              })}
            />
            {!moreSettingProps && <MoreSettings {...moreSettingProps} />}
          </Box>
        </components.TreeItemContent>
        {children && <components.TreeItemGroupTransition {...treeItem.getGroupTransitionProps()} />}
      </components.TreeItemRoot>
    </components.TreeItemProvider>
  );
});
