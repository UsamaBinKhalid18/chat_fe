import React from 'react';

import { CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import { Box, Typography, Grid, Divider, Stack, Avatar } from '@mui/material';

import { IMAGES } from 'src/assets/images';

const features: {
  title: string;
  rows: {
    name: string;
    chatify: boolean | string;
    competitor: boolean | string;
    icon?: string;
  }[];
}[] = [
  {
    title: 'AI Chat Models',
    rows: [
      {
        name: 'OpenAI GPT-4o',
        chatify: true,
        competitor: true,
        icon: IMAGES.gpt,
      },
      {
        name: 'OpenAI GPT-4o-mini',
        chatify: true,
        competitor: true,
        icon: IMAGES.gpt,
      },
      {
        name: 'Google Gemini 2.0 Flash',
        chatify: true,
        competitor: false,
        icon: IMAGES.gemini,
      },
      {
        name: 'Anthropic Claude 3.7 Sonnet',
        chatify: true,
        competitor: false,
        icon: IMAGES.claude,
      },
    ],
  },
  {
    title: 'AI Chat',
    rows: [
      { name: 'Chat with links', chatify: 'Advanced', competitor: 'Limited' },
      { name: 'Chat with documents', chatify: 'Advanced', competitor: 'Limited' },
      { name: 'Analyze data', chatify: 'Advanced', competitor: 'Limited' },
      { name: 'Chat with image', chatify: true, competitor: true },
    ],
  },
  {
    title: 'AI Tools',
    rows: [
      { name: 'Image Generation', chatify: 'Coming soon', competitor: 'Limited' },
      { name: 'AI Search Engine', chatify: 'Coming soon', competitor: false },
    ],
  },
];

const iconMapper = (value: boolean | string, color?: string) => {
  if (value === true) return <CheckCircleOutline htmlColor={color || 'disabled'} />;
  if (value === false) return <CancelOutlined htmlColor={color || 'disabled'} />;
  return (
    <Typography variant='body2' color={color || 'disabled'}>
      {value}
    </Typography>
  );
};

export default function ChatifyProComparison() {
  return (
    <Box mt={11} display='flex' flexDirection='column' alignItems='center' gap={5} width='90%'>
      <Stack alignItems='center' gap={1}>
        <Typography variant='h4' color='primary' fontWeight='bold' textAlign='center'>
          Why go Pro with Chatify?
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Multiple productivity needs, one solution
        </Typography>
      </Stack>

      <Box width='100%' display='flex' flexDirection='column' alignItems='center' gap={7}>
        <Grid container spacing={2} justifyContent='center' mb={-6}>
          <Grid item xs={4}>
            <Typography fontWeight={600} fontSize={24} color='primary'>
              Features
            </Typography>
          </Grid>
          <Grid item xs={4} display='flex' justifyContent='center' alignItems='center' gap={1}>
            <img src={IMAGES.logoLight} width={34} />
            <Typography fontWeight={600} color='primary' textAlign='center'>
              Chatify
            </Typography>
          </Grid>
          <Grid item xs={4} display='flex' justifyContent='center' alignItems='center' gap={1}>
            <Avatar src={IMAGES.gpt} sx={{ width: 24, height: 24 }} />
            <Typography fontWeight={600} color='primary' textAlign='center'>
              OpenAI ChatGPT
            </Typography>
          </Grid>
        </Grid>

        {features.map((section, idx) => (
          <Box key={idx} width='100%'>
            {idx !== 0 && <Divider />}
            <Typography variant='body1' fontWeight='bold' my={2} color='primary'>
              {section.title}
            </Typography>

            <Grid container spacing={2} justifyContent='center'>
              {section.rows.map((row, i) => (
                <React.Fragment key={i}>
                  <Grid item xs={4} display='flex' alignItems='center' gap={1}>
                    {row.icon && <Avatar src={row.icon} sx={{ width: 16, height: 16 }} />}
                    <Typography variant='body2' color='text.secondary'>
                      {row.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign='center'>
                    {iconMapper(row.chatify, '#007bff')}
                  </Grid>
                  <Grid item xs={4} textAlign='center'>
                    {iconMapper(row.competitor)}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
