import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MenuItem, Select, Typography, Box } from '@mui/material';

import { AIModelType } from 'src/common/constants';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { setLoginModal, setUpgradePlanModal } from 'src/redux/reducers/notificationSlice';
import { selectSubscription } from 'src/redux/reducers/subscriptionSlice';

import ColumnBox from './common/ColumnBox';
import { IconMap } from './common/IconsMap';

interface ModelSelectorProps {
  models: AIModelType[];
  activeModel: string;
  onChange: (modelName: string) => void;
  showBackground?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  activeModel,
  onChange,
  showBackground = true,
}) => {
  const user = useSelector(selectCurrentUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();
  return (
    <Select
      value={activeModel}
      onChange={(e) => {
        const value = e.target.value as string;
        if (!user) {
          dispatch(setLoginModal(true));
          return;
        }
        if (!subscription.id && models.find((model) => model.model === value)?.isPro) {
          dispatch(setUpgradePlanModal(true));
        }
        onChange(value);
      }}
      displayEmpty
      renderValue={(value) => {
        const model = models.find((model) => model.model === value);
        return (
          <Typography fontSize={15} fontWeight={500} ml={1}>
            {model?.name}
          </Typography>
        );
      }}
      inputProps={{ sx: { padding: 1 } }}
      sx={{
        borderRadius: 3,
        minWidth: 200,
        alignSelf: 'start',
        background: (theme) => (showBackground ? theme.palette.background.paper : 'transparent'),
        color: 'text.secondary',
        '& .MuiSelect-icon': {
          color: (theme) => (showBackground ? theme.palette.text.primary : 'text.secondary'),
        },
        fieldset: {
          border: 'none',
        },
      }}
    >
      {models.map((model) => (
        <MenuItem
          key={model.model}
          value={model.model}
          sx={{ marginX: 1, marginY: '2px', borderRadius: '12px !important', paddingX: 1 }}
        >
          <Box display='flex' alignItems='center' width='100%'>
            <img src={IconMap[model.icon]} alt={model.icon} width={28} height={28} />
            <ColumnBox alignItems='stretch' mr={1.5}>
              <Typography fontSize={13} fontWeight={500} ml={1}>
                {model.name}
              </Typography>
              <Typography fontSize={12} fontWeight={500} color='text.secondary' ml={1}>
                {model.description}
              </Typography>
            </ColumnBox>
            {model.isPro && !subscription.id && (
              <Typography
                fontSize={12}
                fontWeight={500}
                color='text.secondary'
                sx={{
                  marginLeft: 'auto',
                  backgroundColor: '#ecf4ff',
                  color: '#007bff',
                  padding: '2px 6px',
                  borderRadius: 2.5,
                }}
              >
                Pro
              </Typography>
            )}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};

export default ModelSelector;
