import { Button, TextField } from '@mui/material';

import ColumnBox from './common/ColumnBox';
import RowBox from './common/RowBox';

interface EditProps {
  text: string;
  onChange: (text: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}
export default function Edit({ text, onChange, onCancel, onSubmit }: EditProps) {
  return (
    <ColumnBox alignItems='stretch' gap={2} py={1}>
      <TextField
        variant='outlined'
        autoComplete='off'
        autoFocus
        multiline
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && text) {
            e.preventDefault();
            onSubmit();
          }
        }}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        slotProps={{
          input: { sx: { fontSize: '16px', padding: '0px' } },
          htmlInput: { style: { padding: '0px' } },
        }}
        sx={{
          alignSelf: 'center',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
      />
      <RowBox alignSelf='end' gap={2}>
        <Button onClick={onCancel} sx={{ padding: '2px 6px !important', borderRadius: '50px' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          sx={{ padding: '2px 6px !important' }}
          color='success'
          variant='contained'
        >
          Submit
        </Button>
      </RowBox>
    </ColumnBox>
  );
}
