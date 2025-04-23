import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-expect-error unsupported types
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Check } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton, Typography } from '@mui/material';

// @ts-expect-error unsupported types
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import RowBox from './common/RowBox';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ inline?: boolean; className?: string; children?: React.ReactNode }> = ({
  inline,
  className,
  children,
}) => {
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children).trim();
  const language = match ? match[1] : null;
  const [copied, setCopied] = useState(false);

  if (inline || !language) {
    return (
      <Typography
        component='code'
        sx={{
          backgroundColor: '#FDF6E3',
          padding: '2px 4px',
          borderRadius: '4px',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 2,
        minWidth: '100%',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '40px',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#282a36',
          borderBottom: '1px solid #44475a',
          color: 'white',
          padding: '6px 12px',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          fontSize: 14,
        }}
      >
        <Typography variant='caption' fontSize={12}>
          {language}
        </Typography>
        {copied ? (
          <RowBox>
            <Check sx={{ width: 16, height: 16, mr: '6px', mb: '2px' }} />
            <Typography variant='caption'>Copied</Typography>
          </RowBox>
        ) : (
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            sx={{ color: 'white', width: 32, height: 32, padding: 0 }}
          >
            <ContentCopyIcon fontSize='small' sx={{ width: 16, height: 16 }} />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          overflowX: 'auto',
          backgroundColor: '#fdf6e3',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <SyntaxHighlighter
          style={solarizedlight}
          language={language}
          PreTag='div'
          customStyle={{
            fontSize: 14,
            margin: 0,
            borderRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            display: 'inline-block',
            minWidth: '100%',
            whiteSpace: 'pre',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
