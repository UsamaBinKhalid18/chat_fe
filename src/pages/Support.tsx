import { ArrowRight, EmailOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';

import ColumnBox from 'src/components/common/ColumnBox';
import useResponsive from 'src/hooks/useResponsive';

const faqData = [
  {
    question: 'What can I use chatify for?',
    text: 'Powered by state-of-the-art AI from OpenAI, Anthropic, and Google, chatify saves you time and effort, making your tasks easier and more efficient.',
    listItems: [
      'Create professional emails, blog posts, or social media captions effortlessly with its writing assistance capabilities.',
      'Design unique visuals or enhance existing images for presentations, posts, and creative projects with its image generation tool.',
      'Extract key points from lengthy reports, articles, or notes in seconds using the document summarization feature.',
      'Find precise and up-to-date answers without hassle through its advanced web search functionality.',
      'Gather important data like product prices, reviews, or trends from websites using the data extraction feature.',
    ],
  },
  {
    question: 'What platforms is chatify available on?',
    text: 'chatify is available on various platforms including web, iOS, and Android.',
  },
  {
    question: 'What subscription plans are available?',
    text: 'chatify offers several subscription plans including Free, Pro, and Enterprise.',
  },
  {
    question: 'Can I switch between AI models?',
    text: 'Yes, you can switch between different AI models based on your needs.',
  },
  {
    question: 'What file types are supported for upload?',
    text: 'chatify supports various file types including PDF, DOCX, and TXT.',
  },
  {
    question: 'Is my personal data safe and secure when using chatify?',
    text: 'Yes, chatify ensures that your personal data is safe and secure with advanced encryption and privacy measures.',
  },
  {
    question: 'Can I share my account with others?',
    text: "No, sharing your account with others is not allowed as per chatify's terms of service.",
  },
  {
    question: 'How do I reset my password?',
    text: "You can reset your password by going to the account settings and selecting 'Reset Password'.",
  },
  {
    question: 'Who do I contact if I have questions or need support?',
    text: 'You can contact chatify support through the help center or by emailing support@chatifyai.app.',
  },
  {
    question: 'How can I report a bug to the developer?',
    text: 'You can report bugs by submitting a ticket through the chatify help center.',
  },
  {
    question: 'How can I cancel my subscription?',
    text: "You can cancel your subscription by going to the account settings and selecting 'Cancel Subscription'.",
  },
];

export default function Support() {
  const { isMobile } = useResponsive();
  return (
    <ColumnBox gap={2}>
      <Typography mt={6} variant='h3' width='90%' textAlign='center'>
        Talk with our team
      </Typography>
      <Box
        component='a'
        href='mailto:support@chatifyai.app'
        color='#ddd'
        sx={{
          backgroundColor: 'background.paper',
          padding: 2,
          borderRadius: 4,
          cursor: 'pointer',
          textDecoration: 'none',
          gap: 2,
          minWidth: isMobile ? '90%' : 400,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          mb: 6,
          '&:hover': { backgroundColor: '#383838', '& .emailIcon': { backgroundColor: '#002358' } },
        }}
      >
        <ColumnBox
          className='emailIcon'
          sx={{ backgroundColor: '#666', padding: 1, borderRadius: 8 }}
        >
          <EmailOutlined sx={{ margin: 'auto' }} />
        </ColumnBox>
        <ColumnBox alignItems='start'>
          <Typography fontSize={20} fontWeight={600}>
            Email Us
          </Typography>
          <Typography variant='caption'>We aim to respond within a day</Typography>
        </ColumnBox>
        <ArrowRight sx={{ marginLeft: 'auto' }} />
      </Box>
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
        <Typography variant='h4' textAlign='center'>
          Frequently Asked Questions
        </Typography>
        <Typography variant='caption' fontSize={14} mb={2} textAlign='center'>
          Discover more information by exploring our FAQ section
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion key={index}>
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
