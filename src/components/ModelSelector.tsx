import React from 'react';

import { MenuItem, Select, Typography, Box } from '@mui/material';

import { AIModelType } from 'src/common/constants';

interface ModelSelectorProps {
  models: AIModelType[];
  activeModel: string;
  onChange: (modelName: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, activeModel, onChange }) => {
  return (
    <Select
      value={activeModel}
      onChange={(e) => onChange(e.target.value as string)}
      displayEmpty
      inputProps={{ sx: { padding: 1 } }}
      sx={{ borderRadius: 4, minWidth: 200, alignSelf: 'start' }} // Adjust width as needed
    >
      {models.map((model) => (
        <MenuItem key={model.name} value={model.name}>
          <Box display='flex' alignItems='center'>
            <img src={model.iconUrl} width='20px' height='20px' />
            <Typography ml={1}>{model.name}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default ModelSelector;
