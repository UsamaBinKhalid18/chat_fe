import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';

const faqData = [
  {
    question: 'What can I use Chatify for?',
    text: `Powered by state-of-the-art LLM's from OpenAI, Anthropic, and Google. Chatify saves you time and effort, making your tasks easier and more efficient.`,
    listItems: [
      `Create professional emails, blog posts, or social media captions effortlessly with its writing assistance capabilities.`,
      // `Design unique visuals or images for presentations, posts, and creative projects with its image generation tool.`,
      `Extract key points from lengthy reports, articles, or notes in seconds using the document summarization feature.`,
      `Find precise and up-to-date answers without hassle through its advanced web search functionality.`,
      `Gather important data like product prices, reviews, or trends from websites using the data extraction feature.`,
    ],
  },
  {
    question: 'What platforms is Chatify available on?',
    text: 'Chatify is available as a web app, ensuring seamless access from any desktop or laptop. You can also use Chatify on your mobile device through your web browser, giving you the flexibility to stay productive on the go.',
  },
  {
    question: 'What subscription plans are available?',
    text: 'Chatify offers several subscription plans including Monthly, Quarterly and Yearly.',
  },
  {
    question: 'Can I switch between AI models?',
    text: 'Yes, you can switch between models like OpenAI | GPT-4o Mini, GPT-4o, o3-mini, o3-mini (High), Anthropic | Claude 3.7 Sonnet, Google | Gemini 2.0 Flash, DeepSeek | DeepSeek R1 depending on the task you’re working on. Simply select the model from the dashboard before submitting your query.',
  },
  {
    question: 'What file types are supported for upload?',
    text: 'Chatify supports common file types like .csv, .xlsx, .docx, and .pdf for uploads.',
  },
  {
    question: 'Is my personal data safe and secure when using Chatify?',
    text: 'Yes, your personal data is safe and secure with Chatify. We prioritise your privacy and implement robust security measures, including encryption and secure data storage, to protect your information. Chatify complies with industry standards and best practices to ensure your data is handled responsibly and securely at all times. You can use Chatify with confidence, knowing that your privacy and security are our top priorities.',
  },
  {
    question: 'Can I share my account with others?',
    text: 'Sharing your Chatify account is not recommended for security reasons and may violate our Terms of Use. To ensure the safety of your data and maintain compliance with our policies, we encourage each user to have their own account.',
  },
  {
    question: 'Who do I contact if I have questions or need support?',
    text: 'For any questions or support needs, feel free to email us at support@chatifyai.app. Our team is dedicated to assisting you and aims to respond to all inquiries within 48 hours. We’re here to help and ensure your experience with Chatify is as smooth and enjoyable as possible!',
  },
  {
    question: 'How can I report a bug to the developer?',
    text: 'Email us at support@chatifyai.app with detailed information about the bug, including:',
    listItems: [
      'A clear description of the issue.',
      'Your device model and operating system.',
      'Steps to reproduce the problem, if possible.',
    ],
  },
  {
    question: 'How can I cancel my subscription?',
    text: 'Canceling your subscription is easy:',
    listItems: [
      'Navigate to Pricing Plan in the left sidebar.',
      'Select Manage Billing.',
      'Click Cancel Subscription to complete the process.',
    ],
  },
];

export default function FAQs() {
  return (
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
        <Accordion key={index} sx={{ boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px', fontWeight: 500 }}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ mt: -1 }}>
            <Typography style={{ fontSize: '14px' }}>{faq.text}</Typography>
            {faq.listItems && (
              <ul>
                {faq.listItems.map((item, idx) => (
                  <li key={idx} style={{ fontSize: 14 }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
