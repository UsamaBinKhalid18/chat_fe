import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowUpward, Attachment, Close, Stop } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';
import { useDeleteFileMutation, useUploadMutation } from 'src/apis/uploadApi';
import { addNotification } from 'src/redux/reducers/notificationSlice';

import { autoFills } from './Autofills';
import ColumnBox from './common/ColumnBox';
import RowBox from './common/RowBox';

const FileBox = ({ file, removeFile }: { file: FileUpload | null; removeFile: () => void }) => {
  return (
    <Box
      margin={1}
      position='relative'
      sx={{
        '&:hover .remove-file': {
          display: 'flex',
        },
      }}
    >
      {file && file.content_type.toLowerCase().includes('image') ? (
        <img src={file.url} height={50} width={50} style={{ borderRadius: '12px' }} />
      ) : (
        <Box
          sx={{
            backgroundColor: file ? 'success.dark' : 'black',
            color: 'white',
            fontSize: 12,
            paddingX: 2,
            paddingY: 1,
            borderRadius: '12px',
          }}
        >
          {file ? file.original_name : 'Uploading...'}
        </Box>
      )}
      <IconButton
        className='remove-file'
        onClick={() => {
          removeFile();
        }}
        sx={{
          display: 'none',
          position: 'absolute',
          right: -8,
          top: -8,
          padding: 0,
          height: 20,
          width: 20,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'background.default',
          },
          border: '1px solid #ccc',
        }}
      >
        <Close sx={{ width: 14, height: 14 }} />
      </IconButton>
    </Box>
  );
};

export type FileUpload = {
  file: File;
  uuid: string;
  original_name: string;
  content_type: string;
  url: string;
};

export default function Input({
  onSubmit,
  isChat,
  isStreaming,
  handleStopStreaming,
  text,
}: {
  onSubmit: (message: string, uuid?: string, url?: string, original_name?: string) => void;
  isChat?: boolean;
  isStreaming?: boolean;
  handleStopStreaming?: () => void;
  text?: string;
}) {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      formik.setFieldValue('message', '');
      setFile(null);
      onSubmit(
        values.message,
        file?.uuid ?? undefined,
        file?.url ?? undefined,
        file?.original_name ?? undefined,
      );
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [upload] = useUploadMutation();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<FileUpload | null>(null);
  const [deleteFile] = useDeleteFileMutation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const matchedAutoFill = autoFills.find((autoFill) =>
    formik.values.message.startsWith(autoFill.startingText),
  );

  useEffect(() => {
    if (text) {
      formik.setFieldValue('message', text + ' ');
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleFileChange = async (event: any) => {
    const newFile = event.currentTarget.files[0];
    if (!newFile) return;
    if (newFile.size > 10 * 1024 * 1024)
      return dispatch(
        addNotification({
          message: 'File size should be less than 10MB',
          type: 'error',
          id: Date.now(),
        }),
      );
    setUploading(true);
    try {
      if (file) {
        await deleteFile(file.uuid).unwrap();
      }
      const resp = await upload({ file: newFile }).unwrap();
      formik.setFieldValue('file', resp.url);
      setFile(resp);
    } catch (e: any) {
      dispatch(
        addNotification({ message: 'Failed to upload file', type: 'error', id: Date.now() }),
      );
      console.error(e);
    }
    setUploading(false);
  };

  const removeFile = async () => {
    if (file) {
      try {
        await deleteFile(file.uuid).unwrap();
        formik.setFieldValue('file', '');
        setFile(null);
        const fileInput = fileInputRef.current;
        if (fileInput) fileInput.value = '';
      } catch (e: any) {
        dispatch(
          addNotification({ message: 'Failed to delete file', type: 'error', id: Date.now() }),
        );
        console.error(e);
      }
    }
  };

  return (
    <ColumnBox
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      sx={{
        position: 'relative',
        backgroundColor: 'background.paper',
        borderRadius: 6,
        transition: 'background-color 0.5s',
        '&:hover': {
          backgroundColor: '#444',
        },
      }}
      p={1}
      width={'100%'}
      alignItems='start'
    >
      {(file || uploading) && <FileBox file={file} removeFile={removeFile} />}
      <RowBox width={'100%'} gap={2}>
        <input
          type='file'
          id='file'
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <IconButton sx={{ width: 32, height: 32 }} component='label' htmlFor='file'>
          <Attachment />
        </IconButton>
        <TextField
          inputRef={inputRef}
          variant='outlined'
          autoComplete='off'
          autoFocus
          placeholder={isChat ? '' : 'Type your message ...'}
          fullWidth
          {...formik.getFieldProps('message')}
          slotProps={{
            input: { sx: { fontSize: '16px', padding: '0px' } },
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
        <IconButton
          type={isStreaming ? 'button' : 'submit'}
          onClick={isStreaming ? handleStopStreaming : undefined}
          disabled={!isStreaming && !Boolean(formik.values.message)}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: 'white !important',
            '&:disabled': {
              backgroundColor: 'gray !important',
            },
          }}
        >
          {isStreaming ? (
            <Stop htmlColor='#111' sx={{ width: 20, height: 20 }} />
          ) : (
            <ArrowUpward htmlColor='#111' sx={{ width: 20, height: 20 }} />
          )}
        </IconButton>
      </RowBox>
      {matchedAutoFill && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'background.default',
            borderRadius: 6,
            zIndex: 1,
            height: 400,
            pt: 2,
          }}
        >
          <List sx={{ color: 'white', padding: 0, paddingX: 5 }}>
            {matchedAutoFill.options.map((item, index) => (
              <ListItem
                key={item}
                disablePadding
                sx={{
                  margin: 0,
                }}
              >
                <ListItemButton
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    borderBottom:
                      index === matchedAutoFill.options.length - 1 ? 'none' : '1px solid #353535',
                    borderBottomColor: hoveredIndex === index + 1 ? 'transparent' : '#353535',
                    '&:hover': {
                      backgroundColor: '#353535',
                      borderRadius: 1.5,
                      borderBottom: '1px solid transparent',
                    },
                  }}
                  onClick={() => {
                    formik.setFieldValue('message', `${matchedAutoFill.startingText} ${item}`);
                    formik.submitForm();
                  }}
                >
                  <ListItemText
                    primary={
                      <>
                        <Typography component='span' color='text.secondary'>
                          {matchedAutoFill.startingText}{' '}
                        </Typography>
                        <Typography component='span'>{item}</Typography>
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </ColumnBox>
  );
}
