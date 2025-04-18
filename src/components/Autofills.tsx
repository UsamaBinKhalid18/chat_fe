import { FormatListBulleted } from '@mui/icons-material';

import {
  AdviceSVG,
  AnalyzeDataSVG,
  AnalyzeImageSVG,
  BrainstormSVG,
  CodeSVG,
  ProcessDocSVG,
  WriteSVG,
} from 'src/assets/images/svgs';

type autoFillType = {
  icon: JSX.Element;
  name: string;
  startingText: string;
  options: string[];
};

export const autoFills: autoFillType[] = [
  {
    name: 'Help me write',
    icon: <WriteSVG />,
    startingText: 'Help me write',
    options: ['a speech', 'a poem', 'a blog post', 'a professional email', 'a story'],
  },
  // {
  //   name: 'Create images',
  //   icon: <CreateImageSVG />,
  //   startingText: 'Create an image of',
  //   options: ['a logo', 'a banner', 'an avatar', 'a meme', 'a landscape'],
  // },
  {
    name: 'Code',
    icon: <CodeSVG />,
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
    icon: <AnalyzeImageSVG />,
    startingText: 'Analyze the image by',
    options: [
      'extracting tags',
      'identifying objects',
      'detecting faces',
      'classifying scenes',
      'recognizing text',
    ],
  },
  // {
  //   name: 'Summarize',
  //   icon: <SummarizeSVG />,
  //   startingText: 'Summarize the text about',
  //   options: ['a book', 'an article', 'a movie', 'a meeting', 'a project'],
  // },
  {
    name: 'Get Advice',
    icon: <AdviceSVG />,
    startingText: 'Advise me on',
    options: ['a career', 'a relationship', 'a project', 'a decision', 'a problem'],
  },
  {
    name: 'Process Document',
    icon: <ProcessDocSVG />,
    startingText: 'Process the data of',
    options: ['a report', 'an analysis', 'a presentation', 'a project', 'a task'],
  },
  {
    name: 'Analyze data',
    icon: <AnalyzeDataSVG />,
    startingText: 'Analyze the data of',
    options: ['a report', 'an analysis', 'a presentation', 'a project', 'a task'],
  },
  {
    name: 'Brainstorm',
    icon: <BrainstormSVG />,
    startingText: 'Brainstorm ideas for',
    options: ['a project', 'a task', 'a presentation', 'a report', 'an event'],
  },
  // {
  //   name: 'Web search',
  //   icon: <WebSearchSVG />,
  //   startingText: 'Search the web for',
  //   options: ['information', 'images', 'videos', 'articles', 'news'],
  // },
  {
    name: 'Plan',
    icon: <FormatListBulleted />,
    startingText: 'Plan a',
    options: ['trip', 'project', 'event', 'meeting', 'task'],
  },
];
