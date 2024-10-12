import { Box, Button, styled } from '@mui/material';

export const AllCenterBoxComponent = styled(Box)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
}));
export const JustifyCenterBoxComponent = styled(Box)(() => ({
  justifyContent: 'center',
  display: 'flex',
}));
export const AllCenterButtonComponent = styled(Button)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
}));
export const JustifyCenterButtonComponent = styled(Button)(() => ({
  justifyContent: 'center',
  display: 'flex',
}));

export const AllCenterStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
};
export const JustifyCenterStyle = {
  justifyContent: 'center',
  display: 'flex',
};
export const alignItemsCenterStyle = {
  alignItems: 'center',
  display: 'flex',
};
export const fullSizeStyle = {
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
};

export const ProtoTypeStyle = {
  border: '1px solid gray',
  ...fullSizeStyle,
};
