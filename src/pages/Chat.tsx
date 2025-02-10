import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Box, styled, Typography } from '@mui/material';

import { aiModels } from 'src/common/constants';
import ColumnBox from 'src/components/common/ColumnBox';
import Input from 'src/components/Input';
import MarkdownRenderer from 'src/components/MarkdownRenderer';
import ModelSelector from 'src/components/ModelSelector';
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
  height: 100vh;
  width: 100%;
`;

const StickyTop = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 8px;
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
  isUser: boolean;
  model: string;
};

export default function Chat() {
  const location = useLocation();
  const { message: initialMessage } = location.state || {};
  const model = useSelector(selectModel);

  const [messages, setMessages] = useState<Message[]>(
    initialMessage ? [{ text: initialMessage, isUser: true, model }] : [],
  );
  const { data, isLoading, startStreaming, stopStreaming } = useStream(
    'http://localhost:8000/api/v1/chat-completion/',
  );
  useEffect(() => {
    startStreaming([{ text: initialMessage, isUser: true, model }]);
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
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
      <StickyTop paddingLeft={10} marginLeft={6} marginTop={0.5}>
        <ModelSelector
          onChange={(model) => dispatch(setModel(model))}
          activeModel={model}
          models={aiModels}
        />
      </StickyTop>
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
                backgroundColor: message.isUser ? '#333' : 'secondary',
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
              <MarkdownRenderer content={message.text} />
            </Box>
          ))}
        </ColumnBox>
      </ScrollableMessages>
      <InputWrapper alignSelf='center'>
        <Input
          onSubmit={(message) => {
            startStreaming([...messages, { text: message, isUser: true, model }]);
            setMessages((messages) => [...messages, { text: message, isUser: true, model }]);
          }}
          isChat={true}
          isStreaming={isLoading}
          handleStopStreaming={stopStreaming}
        />
        <Typography textAlign='center' fontSize={14} pt={1} color='secondary' alignSelf='center'>
          Chatapp can make mistakes. Check important info.
        </Typography>
      </InputWrapper>
    </Container>
  );
}
