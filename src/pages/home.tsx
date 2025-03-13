import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import { useGetSubscriptionQuery } from 'src/apis/paymentsApi';
import { utils } from 'src/common/utils';
import { autoFills } from 'src/components/Autofills';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import Input from 'src/components/Input';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { addNotification, setLoginModal } from 'src/redux/reducers/notificationSlice';

export function Home() {
  const [suggestion, setSuggestion] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const { data, refetch } = useGetSubscriptionQuery();

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);
  const handleInputSubmit = (
    message: string,
    fileId?: string,
    fileUrl?: string,
    fileName?: string,
  ) => {
    if (!user) return dispatch(setLoginModal(true));
    if (data?.is_active)
      return navigate('/chat', { state: { message, fileId, fileUrl, fileName } });
    navigate('/pricing');
    dispatch(
      addNotification({ message: 'Please subscribe to continue', type: 'info', id: Date.now() }),
    );
  };
  return (
    <ColumnBox minHeight='100%'>
      <ColumnBox flexGrow={1} justifyContent='center' width={'100%'}>
        <Typography variant='h3' color='secondary' textAlign='center'>
          How can I help you today?
        </Typography>
        <Box width='90%' maxWidth='700px' mt={5}>
          <Input onSubmit={handleInputSubmit} text={suggestion} />
        </Box>
        <RowBox flexWrap='wrap' justifyContent='center' width='80%' maxWidth='700px' mt={5} gap={2}>
          {autoFills.map((autoFill, index) => (
            <ColumnBox
              key={index}
              alignItems='center'
              width={{ xs: '45%', sm: '30%', md: '18%' }}
              mb={2}
              gap={1}
            >
              <IconButton
                sx={{
                  padding: 2,
                  borderRadius: 4,
                  border: '1px solid, #424242',
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  height: 64,
                }}
                onClick={() => setSuggestion(autoFill.startingText)}
              >
                {React.cloneElement(autoFill.icon, {
                  htmlColor: utils.stringToColor(autoFill.name),
                })}
              </IconButton>
              <Typography variant='caption' textAlign='center' noWrap>
                {autoFill.name}
              </Typography>
            </ColumnBox>
          ))}
        </RowBox>
      </ColumnBox>
      <Typography textAlign='center' fontSize={14} py={1} color='secondary' alignSelf='center'>
        Chatify can make mistakes. Check important info.
      </Typography>
    </ColumnBox>
  );
}
