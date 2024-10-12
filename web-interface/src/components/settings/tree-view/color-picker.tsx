import { BoxProps, styled, Button, Popover, Typography, Tooltip } from '@mui/material';
import React from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps extends BoxProps {
  color?: string;
  width?: number;
}

const ColorPickerButton = styled(Button)<ColorPickerProps>(({ theme, color, width }) => ({
  borderRadius: `${(width || 10) / 2}px`,
  height: width,
  padding: 0,
  minWidth: 0,
  aspectRatio: 1,
  backgroundColor: color || 'yellow',
  marginRight: '8px',
  boxSizing: 'border-box',

  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ColorPicker = ({ color, width = 14, onChangeColor }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Tooltip placement="top" title="choose a new color">
        <ColorPickerButton color={color} width={width} onClick={handleClick} />
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        id={id}
        open={open}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 2,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        onClose={handleClose}
      >
        <HexColorPicker
          disableAlpha
          color={color}
          onChange={color => {
            onChangeColor && onChangeColor(color);
          }}
        />
      </Popover>
    </>
  );
};
export default ColorPicker;
