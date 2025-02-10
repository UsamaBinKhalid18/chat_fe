import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Link,
} from '@mui/material';

import ColumnBox from 'src/components/common/ColumnBox';

const faqData = [
  {
    question: 'What can I use chatapp for?',
    text: 'Powered by state-of-the-art AI from OpenAI, Anthropic, and Google, chatapp saves you time and effort, making your tasks easier and more efficient.',
    listItems: [
      'Create professional emails, blog posts, or social media captions effortlessly with its writing assistance capabilities.',
      'Design unique visuals or enhance existing images for presentations, posts, and creative projects with its image generation tool.',
      'Extract key points from lengthy reports, articles, or notes in seconds using the document summarization feature.',
      'Find precise and up-to-date answers without hassle through its advanced web search functionality.',
      'Gather important data like product prices, reviews, or trends from websites using the data extraction feature.',
    ],
  },
  {
    question: 'What platforms is chatapp available on?',
    text: 'chatapp is available on various platforms including web, iOS, and Android.',
  },
  {
    question: 'What subscription plans are available?',
    text: 'chatapp offers several subscription plans including Free, Pro, and Enterprise.',
  },
  {
    question: 'Can I switch between AI models?',
    text: 'Yes, you can switch between different AI models based on your needs.',
  },
  {
    question: 'What file types are supported for upload?',
    text: 'chatapp supports various file types including PDF, DOCX, and TXT.',
  },
  {
    question: 'Is my personal data safe and secure when using chatapp?',
    text: 'Yes, chatapp ensures that your personal data is safe and secure with advanced encryption and privacy measures.',
  },
  {
    question: 'Can I share my account with others?',
    text: "No, sharing your account with others is not allowed as per chatapp's terms of service.",
  },
  {
    question: 'How do I reset my password?',
    text: "You can reset your password by going to the account settings and selecting 'Reset Password'.",
  },
  {
    question: 'Who do I contact if I have questions or need support?',
    text: 'You can contact chatapp support through the help center or by emailing support@chatapp.com.',
  },
  {
    question: 'How can I report a bug to the developer?',
    text: 'You can report bugs by submitting a ticket through the chatapp help center.',
  },
  {
    question: 'How can I cancel my subscription?',
    text: "You can cancel your subscription by going to the account settings and selecting 'Cancel Subscription'.",
  },
];

export default function Support() {
  return (
    <ColumnBox>
      <Typography my={10} variant='h5' width='90%' textAlign='center'>
        Reach out to us: <Link href='mailto:support@chatapp.com'>support@chatapp.com</Link>
      </Typography>
      <Box
        width='90%'
        maxWidth='800px'
        margin='auto'
        display='flex'
        flexDirection='column'
        gap={1}
        sx={{
          '& > .Mui-expanded': {
            margin: '0px !important',
          },
          '& > .MuiAccordion-root': {
            borderRadius: '12px !important',
            '&::before': { opacity: 0 },
          },
        }}
      >
        <Typography variant='h4'>Frequently Asked Questions</Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography style={{ fontSize: '16px', fontWeight: 600 }}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{ fontSize: '14px' }}>{faq.text}</Typography>
              {faq.listItems && (
                <ul>
                  {faq.listItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ColumnBox>
  );
}
