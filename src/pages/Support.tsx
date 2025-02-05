import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Link,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ColumnBox from 'src/components/common/ColumnBox';

export default function Support() {
  return (
    <ColumnBox>
      <Typography my={10} variant='h5'>
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
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>What can I use chatapp for?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              Powered by state-of-the-art AI from OpenAI, Anthropic, and Google, chatapp saves you
              time and effort, making your tasks easier and more efficient.
            </Typography>
            <ul>
              <li>
                Create professional emails, blog posts, or social media captions effortlessly with
                its writing assistance capabilities.
              </li>
              <li>
                Design unique visuals or enhance existing images for presentations, posts, and
                creative projects with its image generation tool.
              </li>
              <li>
                Extract key points from lengthy reports, articles, or notes in seconds using the
                document summarization feature.
              </li>
              <li>
                Find precise and up-to-date answers without hassle through its advanced web search
                functionality.
              </li>
              <li>
                Gather important data like product prices, reviews, or trends from websites using
                the data extraction feature.
              </li>
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              What platforms is chatapp available on?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              chatapp is available on various platforms including web, iOS, and Android.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              What subscription plans are available?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              chatapp offers several subscription plans including Free, Pro, and Enterprise.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>Can I switch between AI models?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              Yes, you can switch between different AI models based on your needs.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              What file types are supported for upload?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              chatapp supports various file types including PDF, DOCX, and TXT.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              Is my personal data safe and secure when using chatapp?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              Yes, chatapp ensures that your personal data is safe and secure with advanced
              encryption and privacy measures.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              Can I share my account with others?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              No, sharing your account with others is not allowed as per chatapp's terms of service.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>How do I reset my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              You can reset your password by going to the account settings and selecting "Reset
              Password".
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              Who do I contact if I have questions or need support?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              You can contact chatapp support through the help center or by emailing
              support@chatapp.com.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>
              How can I report a bug to the developer?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              You can report bugs by submitting a ticket through the chatapp help center.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '16px' }}>How can I cancel my subscription?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              You can cancel your subscription by going to the account settings and selecting
              "Cancel Subscription".
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ColumnBox>
  );
}
