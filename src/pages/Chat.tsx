import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Cached, ContentCopy, InsertDriveFile, Edit as EditIcon } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, styled, Typography } from '@mui/material';

import { aiModels } from 'src/common/constants';
import { utils } from 'src/common/utils';
import ColumnBox from 'src/components/common/ColumnBox';
import { IconMap } from 'src/components/common/IconsMap';
import RowBox from 'src/components/common/RowBox';
import Edit from 'src/components/Edit';
import Input from 'src/components/Input';
import MarkdownRenderer from 'src/components/MarkdownRenderer';
import ModelSelector from 'src/components/ModelSelector';
import { API_BASE_URL } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import useStream from 'src/hooks/useStream';
import { selectModel, setModel } from 'src/redux/reducers/chatCompletionSlice';
import { addNotification } from 'src/redux/reducers/notificationSlice';

const InputWrapper = styled(Box)(
  ({ theme }) => `
  position: sticky;
  bottom: 0;
  left: 0;
  width: 90%;
  max-width: 700px;
  padding: 8px 0px;
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
  const { isMobile } = useResponsive();
  const [editMessageIndex, setEditMessageIndex] = useState<number | null>(null);
  const [editMessage, setEditMessage] = useState<string>('');

  const [messages, setMessages] = useState<Message[]>(
    initialMessage
      ? [{ text: initialMessage, isUser: true, model, fileId, fileUrl, fileName }]
      : [],
  );
  const { data, isLoading, startStreaming, stopStreaming } = useStream(
    `${API_BASE_URL}/api/fastapi/chat-completion/`,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!initialMessage) {
      navigate('/');
      return () => stopStreaming();
    }
    startStreaming([{ text: initialMessage, isUser: true, model, fileId, fileUrl, fileName }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearEdit = () => {
    setEditMessageIndex(null);
    setEditMessage('');
  };

  useEffect(() => {
    setMessages((messages) => {
      if (messages.at(-1)?.isUser === false) {
        return [
          ...messages.slice(0, -1),
          { text: data, isUser: false, model: messages.at(-1)?.model || model },
        ];
      } else {
        return [...messages, { text: data, isUser: false, model: messages.at(-1)?.model || model }];
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLoading, data]);
  const streamFromIndex = (index: number, model?: string) => {
    const newMessages = messages.slice(0, index);
    if (model) {
      dispatch(setModel(model));
      newMessages[index - 1] = { ...newMessages[index - 1], model };
    }
    setMessages(newMessages);
    startStreaming(newMessages, { modelName: model });
  };

  return (
    <Container>
      <ScrollableMessages width='100%' alignSelf='center'>
        <ColumnBox width='90%' maxWidth={700} gap={1} alignSelf='center'>
          {messages.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.isUser ? 'end' : 'start'}
              maxWidth={message.isUser ? '70%' : 'calc(100% - 42px)'}
              padding={message.isUser ? '0 .25rem' : 0}
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
            >
              {message.isUser ? (
                editMessageIndex !== index && (
                  <IconButton
                    sx={{
                      ':hover': { backgroundColor: 'transparent' },
                      maxWidth: '22px',
                      maxHeight: '22px',
                      alignSelf: 'end',
                      mb: 1,
                      mr: 1,
                    }}
                    onClick={() => {
                      setEditMessageIndex(index);
                      setEditMessage(message.text);
                    }}
                  >
                    <EditIcon htmlColor='#777' sx={{ height: '22px', width: '22px' }} />
                  </IconButton>
                )
              ) : (
                <>
                  <img
                    src={IconMap[aiModels.find((m) => m.model == message.model)?.icon ?? 'gemini']}
                    alt='AI'
                    width='30px'
                    height='30px'
                    style={{
                      marginTop: '8px',
                      marginRight: '12px',
                      borderRadius: '50%',
                      border: '1px solid grey',
                    }}
                  />
                </>
              )}

              <ColumnBox alignItems='start' gap={1} maxWidth='100%'>
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
                  sx={{
                    backgroundColor: message.isUser ? 'background.paper' : 'secondary',
                    ...(message.isUser && {
                      width: '450px',
                      minWidth: '100%',
                    }),
                  }}
                >
                  <Box>
                    {editMessageIndex == index ? (
                      <Edit
                        text={editMessage}
                        onChange={(text) => setEditMessage(text)}
                        onCancel={clearEdit}
                        onSubmit={() => {
                          const newMessages = messages.slice(0, index);
                          newMessages.push({
                            text: editMessage,
                            isUser: true,
                            model: message.model,
                          });
                          startStreaming(newMessages);
                          setMessages(newMessages);
                          clearEdit();
                        }}
                      />
                    ) : (
                      <MarkdownRenderer content={message.text} />
                    )}
                  </Box>
                  {isLoading && !message.isUser && index == messages.length - 1 && (
                    <CircularProgress size={20} sx={{ margin: message.text ? 0 : 1.75 }} />
                  )}
                  {!message.isUser && (!isLoading || index !== messages.length - 1) && (
                    <RowBox gap={1}>
                      <IconButton
                        sx={{
                          ':hover': { backgroundColor: 'transparent' },
                          maxWidth: '22px',
                          maxHeight: '22px',
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(message.text);
                          dispatch(
                            addNotification({
                              id: Date.now(),
                              message: 'Copied to clipboard',
                              type: 'success',
                            }),
                          );
                        }}
                      >
                        <ContentCopy htmlColor='#777' sx={{ height: '20px', width: '20px' }} />
                      </IconButton>
                      <IconButton
                        sx={{
                          ':hover': { backgroundColor: 'transparent' },
                          maxWidth: '22px',
                          maxHeight: '22px',
                        }}
                        onClick={() => streamFromIndex(index)}
                      >
                        <Cached htmlColor='#777' sx={{ height: '22px', width: '22px' }} />
                      </IconButton>
                      <ModelSelector
                        models={aiModels}
                        activeModel={message.model}
                        onChange={(model) => streamFromIndex(index, model)}
                        showBackground={false}
                      />
                    </RowBox>
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
            clearEdit();
          }}
          isChat={true}
          isStreaming={isLoading}
          handleStopStreaming={stopStreaming}
        />
        <Typography
          textAlign='center'
          fontSize={isMobile ? 12 : 14}
          pt={1}
          color='secondary'
          alignSelf='center'
        >
          Chatify can make mistakes. Check important info.
        </Typography>
      </InputWrapper>
    </Container>
  );
}
