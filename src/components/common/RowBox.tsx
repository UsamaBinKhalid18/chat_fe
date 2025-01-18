import { CSSProperties } from 'react';

import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface RowBoxProps extends BoxProps {
  alignItems?: CSSProperties['alignItems'];
}

const RowBox = styled(Box)<RowBoxProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ alignItems = 'center' }) => alignItems};
`;

export default RowBox;
