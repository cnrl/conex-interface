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
// import { MoreSettings } from './more-settings';
import * as components from './styled-components';
import ColorPicker from './color-picker';
import { Checkbox, ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface StyledTreeItemProps extends Omit<UseTreeItemParameters, 'rootRef'>, React.HTMLAttributes<HTMLLIElement> {
  moreSettingProps?: any; // for more setting menu function calls
  onChangeColor?: (color: string) => void;
  onChangeLabel?: (newName: string) => void;
  onEditClick?: () => void;
  selected?: boolean;
}

export const TreeItem = React.forwardRef(function TreeItem(
  props: StyledTreeItemProps,
  rootRef: React.Ref<HTMLLIElement>,
) {
  // NOTE: Select out all child StyledTreeItemProps from props
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const { itemId, children, moreSettingProps, color, onChangeColor, onChangeLabel, onEditClick, selected, ...other } =
    props;
  const logicProps = ['id', 'itemId', 'children', 'label', 'disabled'] as const;
  const bypassedProps = omit(logicProps, other);
  const { status, ...treeItem } = useTreeItem({ ...pick(logicProps, props), rootRef });

  const stopPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onChangeLabel && setIsEditing(true);
  };

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
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between', pr: 0 }}>
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', pr: 0 }}>
              <components.TreeItemIconContainer {...treeItem.getIconContainerProps()}>
                <TreeItem2Icon status={status} />
              </components.TreeItemIconContainer>
              {color && (
                <ColorPicker
                  color={color}
                  onChangeColor={(color: string) => {
                    onChangeColor && onChangeColor(color);
                  }}
                />
              )}
              {isEditing && onChangeLabel ? (
                <ClickAwayListener onClickAway={() => setIsEditing(false)}>
                  <input
                    type="text"
                    value={`${other.label}`}
                    onClick={stopPropagation}
                    onChange={e => {
                      e.stopPropagation();
                      onChangeLabel && onChangeLabel(e.target.value);
                    }}
                    onKeyDown={e => {
                      e.stopPropagation();
                      if (e.key == 'Enter') {
                        setIsEditing(false);
                      }
                    }}
                  />
                </ClickAwayListener>
              ) : (
                <Tooltip placement="top" title={onChangeLabel ? 'double-click to edit' : ''}>
                  <Typography
                    {...treeItem.getLabelProps({
                      variant: 'body2',
                      sx: {
                        display: 'flex',
                        fontWeight: 'inherit',
                        flexGrow: 1,
                        cursor: 'pointer',
                        minWidth: '30px',
                      },
                    })}
                    sx={{ minHeight: '10px', minWidth: '30px', background: other.label ? null : 'gray' }}
                    onDoubleClick={handleEdit}
                  />
                </Tooltip>
              )}
            </Box>
            {/* {!moreSettingProps && <MoreSettings {...moreSettingProps} />} */}
            {onEditClick && (
              <IconButton onClick={() => onEditClick()}>
                <EditNoteIcon />
              </IconButton>
            )}
          </Box>
        </components.TreeItemContent>
        {children && <components.TreeItemGroupTransition {...treeItem.getGroupTransitionProps()} />}
      </components.TreeItemRoot>
    </components.TreeItemProvider>
  );
});
