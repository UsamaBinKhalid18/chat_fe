import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Analytics,
  Article,
  Code,
  DocumentScanner,
  Edit,
  Psychology,
  QuestionMark,
  RemoveRedEye,
} from '@mui/icons-material';
import { Box, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import { useGetSubscriptionQuery } from 'src/apis/paymentsApi';
import { aiModels } from 'src/common/constants';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import Input from 'src/components/Input';
import ModelSelector from 'src/components/ModelSelector';
import useResponsive from 'src/hooks/useResponsive';
import { selectCurrentUser } from 'src/redux/reducers/authSlice';
import { selectModel, setModel } from 'src/redux/reducers/chatCompletionSlice';
import { addNotification, setLoginModal } from 'src/redux/reducers/notificationSlice';

type autoFillType = {
  icon: JSX.Element;
  name: string;
  startingText: string;
  options: string[];
};

const autoFills: autoFillType[] = [
  {
    name: 'Help me write',
    icon: <Edit />,
    startingText: 'Help me write',
    options: ['a speech', 'a poem', 'a blog post', 'a professional email', 'a story'],
  },
  // {
  //   name: 'Create images',
  //   icon: <Image />,
  //   startingText: 'Create an image of',
  //   options: ['a logo', 'a banner', 'an avatar', 'a meme', 'a landscape'],
  // },
  {
    name: 'Code',
    icon: <Code />,
    startingText: 'Help me with',
    options: [
      'debugging my code',
      'writing a function',
      'learning Python',
      'creating a website',
      'optimizing performance',
    ],
  },
  {
    name: 'Analyze image',
    icon: <RemoveRedEye />,
    startingText: 'Analyze the image by',
    options: [
      'extracting tags',
      'identifying objects',
      'detecting faces',
      'classifying scenes',
      'recognizing text',
    ],
  },
  {
    name: 'Summarize',
    icon: <DocumentScanner />,
    startingText: 'Summarize the text about',
    options: ['a book', 'an article', 'a movie', 'a meeting', 'a project'],
  },
  {
    name: 'Get Advice',
    icon: <QuestionMark />,
    startingText: 'Advise me on',
    options: ['a career', 'a relationship', 'a project', 'a decision', 'a problem'],
  },
  {
    name: 'Process Document',
    icon: <Article />,
    startingText: 'Process the data of',
    options: ['a report', 'an analysis', 'a presentation', 'a project', 'a task'],
  },
  {
    name: 'Analyze data',
    icon: <Analytics />,
    startingText: 'Analyze the data of',
    options: ['a report', 'an analysis', 'a presentation', 'a project', 'a task'],
  },
  {
    name: 'Brainstorm',
    icon: <Psychology />,
    startingText: 'Brainstorm ideas for',
    options: ['a project', 'a task', 'a presentation', 'a report', 'an event'],
  },
  // {
  //   name: 'Web search',
  //   icon: <Language />,
  //   startingText: 'Search the web for',
  //   options: ['information', 'images', 'videos', 'articles', 'news'],
  // },
];

export function Home() {
  const [suggestion, setSuggestion] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const model = useSelector(selectModel);
  const user = useSelector(selectCurrentUser);
  const { data, refetch } = useGetSubscriptionQuery();
  const { isSmallerScreen } = useResponsive();

  const handleChange = (_: React.MouseEvent<HTMLElement>, model: string) => {
    dispatch(setModel(model));
  };

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
    <ColumnBox height={'100vh'}>
      {isSmallerScreen ? (
        <Box mt={1}>
          <ModelSelector
            models={aiModels}
            activeModel={model}
            onChange={(model) => dispatch(setModel(model))}
          />
        </Box>
      ) : (
        <RowBox mt={1}>
          <ToggleButtonGroup onChange={handleChange} value={model} exclusive>
            {aiModels.map((model) => (
              <ToggleButton
                key={model.name}
                value={model.name}
                sx={{ color: 'white', borderRadius: 16 }}
              >
                <img
                  src={model.iconUrl}
                  alt={model.name}
                  style={{ width: 30, height: 30, marginRight: 16 }}
                />
                {model.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </RowBox>
      )}
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
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
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
    </ColumnBox>
  );
}
