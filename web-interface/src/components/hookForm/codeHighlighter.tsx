import React, { useEffect, useState } from 'react';
import { TextField, Box, ClickAwayListener } from '@mui/material';
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism.css'; // Import Prism.js CSS for styling
import 'prismjs/components/prism-javascript.min.js'; // Import necessary languages

const CodeHighlighter = ({ item, register, errors, getValues }) => {
  const [code, setCode] = useState('// Write your code here');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) {
      Prism.highlightAll(); // Highlight the code only when not editing
    }
  }, [code, editing]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
      {editing && (
        <ClickAwayListener onClickAway={() => setEditing(false)}>
          <TextField
            fullWidth
            multiline
            label="Code Input"
            rows={10}
            variant="filled"
            {...register(item.id)}
            defaultValue={item.value}
          />
        </ClickAwayListener>
      )}
      {!editing && (
        <Box
          className="language-javascript" // Specify the language for Prism
          component="pre"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            color: '#ffffff',
            padding: '16px',
            borderRadius: '4px 4px 0 0',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap', // Allows wrapping of long lines
            borderBottom: '1px solid black',
            display: 'flex',
            margin: '0px !important',
          }}
          onClick={() => setEditing(true)}
        >
          <code style={{ fontSize: 14 }}>{getValues(item.id) || item.value}</code>
        </Box>
      )}
    </Box>
  );
};

export default CodeHighlighter;
