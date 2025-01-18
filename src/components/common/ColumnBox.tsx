import { CSSProperties } from 'react';

import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface ColumnBoxProps extends BoxProps {
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
}

const ColumnBox = styled(Box)<ColumnBoxProps>(
  ({ alignItems = 'center', justifyContent = 'center' }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems,
    justifyContent,
  }),
);

export default ColumnBox;
