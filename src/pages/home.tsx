import {
  Analytics,
  Article,
  Attachment,
  Code,
  DocumentScanner,
  Edit,
  Help,
  Image,
  Language,
  Psychology,
  QuestionMark,
  RemoveRedEye,
  Send,
} from '@mui/icons-material';
import {
  Grid2,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { IMAGES } from 'src/assets/images';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';

type AIModelType = {
  name: string;
  iconUrl: string;
};
const aiModels: AIModelType[] = [
  { name: 'GPT 4o Mini', iconUrl: IMAGES.gpt },
  { name: 'GPT 4o', iconUrl: IMAGES.gpt },
  { name: 'Gemini 1.5 Pro', iconUrl: IMAGES.gemini },
  { name: 'Claude 3.5 Sonnet', iconUrl: IMAGES.claude },
];

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
  {
    name: 'Create images',
    icon: <Image />,
    startingText: 'Create an image of',
    options: ['a logo', 'a banner', 'an avatar', 'a meme', 'a landscape'],
  },
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
    name: 'Process Docoument',
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
  {
    name: 'Web search',
    icon: <Language />,
    startingText: 'Search the web for',
    options: ['information', 'images', 'videos', 'articles', 'news'],
  },
];

export function Home() {
  const [model, setModel] = useState(aiModels[0].name);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setModel(newAlignment);
  };
  return (
    <ColumnBox height={'100vh'}>
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
      <ColumnBox flexGrow={1} justifyContent='center' width={'100%'}>
        <Typography variant='h3' color='secondary' textAlign='center'>
          How can I help you today?
        </Typography>
        <RowBox
          sx={{ backgroundColor: 'background.paper', borderRadius: 16 }}
          mt={2}
          p={1}
          width={'50%'}
          gap={2}
        >
          <IconButton>
            <Attachment />
          </IconButton>
          <TextField
            variant='outlined'
            fullWidth
            multiline
            slotProps={{
              input: { disableUnderline: true, sx: { fontSize: '20px', padding: '0px' } },
              htmlInput: { style: { padding: '0px' } },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
          <IconButton>
            <Send />
          </IconButton>
        </RowBox>
        <RowBox flexWrap='wrap' justifyContent='center' width='50%' mt={5} gap={2}>
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
              >
                {autoFill.icon}
              </IconButton>
              <Typography variant='caption' textAlign='center'>
                {autoFill.name}
              </Typography>
            </ColumnBox>
          ))}
        </RowBox>
      </ColumnBox>
    </ColumnBox>
  );
}
