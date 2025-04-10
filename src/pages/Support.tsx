import { ArrowRight, EmailOutlined } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';

import ColumnBox from 'src/components/common/ColumnBox';
import useResponsive from 'src/hooks/useResponsive';

import FAQs from './FAQs';

export default function Support() {
  const { isMobile } = useResponsive();
  return (
    <ColumnBox gap={2} mb={2}>
      <Typography mt={6} variant='h3' width='90%' textAlign='center'>
        Talk with our team
      </Typography>
      <Box
        component='a'
        href='mailto:support@Chatifyai.app'
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          padding: 2,
          borderRadius: 4,
          cursor: 'pointer',
          textDecoration: 'none',
          gap: 2,
          minWidth: isMobile ? '90%' : 500,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mb: 6,
          '&:hover': {
            '& .emailIcon': {
              backgroundColor: '#007bff',
              '& .MuiSvgIcon-root': { color: 'white' },
            },
          },
        }}
      >
        <ColumnBox
          className='emailIcon'
          sx={{
            backgroundColor: '#e2e2e2',
            padding: 1,
            borderRadius: 8,
            transition: 'background-color 0.5s',
          }}
        >
          <EmailOutlined sx={{ margin: 'auto', color: 'black', transition: 'color 0.5s' }} />
        </ColumnBox>
        <ColumnBox alignItems='start'>
          <Typography fontSize={16} fontWeight={600}>
            Email Us
          </Typography>
          <Typography variant='caption' fontSize={13} color='text.secondary'>
            We aim to respond within a day
          </Typography>
        </ColumnBox>
        <ArrowRight sx={{ marginLeft: 'auto' }} />
      </Box>
      <FAQs />
    </ColumnBox>
  );
}
