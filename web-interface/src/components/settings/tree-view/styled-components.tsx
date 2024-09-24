import { alpha, styled } from '@mui/material/styles';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  TreeItem2Content as MuiTreeItemContent,
  TreeItem2GroupTransition as MuiTreeItemGroupTransition,
  TreeItem2IconContainer as MuiTreeItemIconContainer,
  TreeItem2Root as MuiTreeItemRoot,
} from '@mui/x-tree-view/TreeItem2';

export { TreeItem2Provider as TreeItemProvider } from '@mui/x-tree-view/TreeItem2Provider';

export const TreeItemRoot = styled(MuiTreeItemRoot)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export const TreeItemContent = styled(MuiTreeItemContent)(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: theme.palette.text.secondary,
  borderRadius: 4,
  paddingRight: theme.spacing(1),
  fontWeight: theme.typography.fontWeightMedium,
  '&.expanded': {
    fontWeight: theme.typography.fontWeightRegular,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const TreeItemIconContainer = styled(MuiTreeItemIconContainer)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const TreeItemGroupTransition = styled(MuiTreeItemGroupTransition)(({ theme }) => ({
  marginLeft: 0,
  [`& .content`]: {
    paddingLeft: theme.spacing(2),
  },
}));
