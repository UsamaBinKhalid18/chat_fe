import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { InsertDriveFile } from '@mui/icons-material';
import { Box, CircularProgress, styled, Typography } from '@mui/material';

import { aiModels } from 'src/common/constants';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import RowBox from 'src/components/common/RowBox';
import Input from 'src/components/Input';
import MarkdownRenderer from 'src/components/MarkdownRenderer';
import ModelSelector from 'src/components/ModelSelector';
import { API_BASE_URL } from 'src/config';
import useStream from 'src/hooks/useStream';
import { selectModel, setModel } from 'src/redux/reducers/chatCompletionSlice';

const InputWrapper = styled(Box)(
  ({ theme }) => `
  position: sticky;
  bottom: 0;
  left: 0;
  width: 90%;
  max-width: 700px;
  padding: 8px 0px;
  padding-bottom: 12px;
  background-color: ${theme.palette.background.default};
  z-index: 1000; // Ensure it's above other content
`,
);

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  width: 100%;
`;

const ScrollableMessages = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
`;

export type Message = {
  text: string;
  fileId?: string;
  fileUrl?: string;
  fileName?: string;
  isUser: boolean;
  model: string;
};

export default function Chat() {
  const location = useLocation();
  const { message: initialMessage, fileId, fileUrl, fileName } = location.state || {};
  const model = useSelector(selectModel);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>(
    initialMessage
      ? [{ text: initialMessage, isUser: true, model, fileId, fileUrl, fileName }]
      : [],
  );
  const { data, isLoading, startStreaming, stopStreaming } = useStream(
    `${API_BASE_URL}/api/v1/chat-completion/`,
  );
  useEffect(() => {
    startStreaming([{ text: initialMessage, isUser: true, model, fileId, fileUrl, fileName }]);
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialMessage) {
      navigate('/');
    }
    return () => stopStreaming();
  }, []);

  useEffect(() => {
    if (data) {
      setMessages((messages) => {
        if (messages.at(-1)?.isUser === false) {
          return [
            ...messages.slice(0, -1),
            { text: data, isUser: false, model: messages.at(-1)?.model || model },
          ];
        } else {
          return [
            ...messages,
            { text: data, isUser: false, model: messages.at(-1)?.model || model },
          ];
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLoading, data]);

  return (
    <Container>
      <ScrollableMessages width='100%' alignSelf='center'>
        <ColumnBox width='90%' maxWidth={700} gap={1} alignSelf='center'>
          {messages.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.isUser ? 'end' : 'start'}
              maxWidth={message.isUser ? '70%' : '100%'}
              padding={message.isUser ? '0 1rem' : 0}
              borderRadius={4}
              display='flex'
              alignItems='start'
              sx={{
                // backgroundColor: message.isUser ? '#333' : 'secondary',
                animation: 'fadeIn 0.5s ease-in-out',
                '@keyframes fadeIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(-20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
              color='white'
            >
              {!message.isUser && (
                <img
                  src={aiModels.find((m) => m.name == message.model)?.iconUrl ?? ''}
                  alt='AI'
                  width='30px'
                  height='30px'
                  style={{
                    marginTop: '4px',
                    marginRight: '8px',
                    borderRadius: '50%',
                    border: '1px solid grey',
                  }}
                />
              )}

              <ColumnBox alignItems='start' gap={1}>
                {message.fileName &&
                  message.isUser &&
                  // file extension if image
                  (['png', 'jpg', 'jpeg'].includes(message.fileName.split('.').at(-1) ?? '') ? (
                    <img
                      src={message.fileUrl}
                      height={100}
                      width={100}
                      style={{ borderRadius: '12px', alignSelf: 'end' }}
                    />
                  ) : (
                    <RowBox
                      sx={{
                        backgroundColor: 'success.dark',
                        color: 'white',
                        fontSize: 12,
                        paddingX: 1,
                        paddingY: 1,
                        borderRadius: '12px',
                      }}
                      gap={1}
                    >
                      <InsertDriveFile />
                      {utils.truncateString(message.fileName)}
                    </RowBox>
                  ))}
                <Box
                  alignSelf={message.isUser ? 'end' : 'start'}
                  padding={message.isUser ? '0 1rem' : 0}
                  borderRadius={4}
                  sx={{ backgroundColor: message.isUser ? '#333' : 'secondary' }}
                >
                  <MarkdownRenderer content={message.text} />
                  {isLoading && !message.isUser && index == messages.length - 1 && (
                    <CircularProgress size={20} />
                  )}
                </Box>
              </ColumnBox>
            </Box>
          ))}
        </ColumnBox>
      </ScrollableMessages>
      <InputWrapper alignSelf='center'>
        <Input
          onSubmit={(message, fileId, fileUrl, fileName) => {
            startStreaming([...messages, { text: message, fileId, isUser: true, model }]);
            setMessages((messages) => [
              ...messages,
              { text: message, fileId, isUser: true, model, fileUrl, fileName },
            ]);
          }}
          isChat={true}
          isStreaming={isLoading}
          handleStopStreaming={stopStreaming}
        />
        <Typography textAlign='center' fontSize={14} pt={1} color='secondary' alignSelf='center'>
          Chatify can make mistakes. Check important info.
        </Typography>
      </InputWrapper>
    </Container>
  );
}
