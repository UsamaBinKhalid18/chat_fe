import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import { IMAGES } from 'src/assets/images';
import { StarSVG } from 'src/assets/images/svgs';

import ColumnBox from '../common/ColumnBox';
import RowBox from '../common/RowBox';

interface Review {
  id: string;
  author: string;
  content: string;
  heading: string;
  rating: number;
  designation: string;
  image: string;
}

const reviews: Review[] = [
  {
    id: '1',
    heading: 'Exactly what I needed',
    content: `Having the best AI models in one place with Chatify has streamlined our whole AI workflow. No more tab switching. It's exactly what our team needed!`,
    rating: 5,
    author: 'David Miller',
    designation: 'Product Manager',
    image: IMAGES.avatar1,
  },
  {
    id: '2',
    heading: 'Find of the year',
    content: `It has simplified my content creation process with its amazing chat and image generation. Plus it offers all the industry standard AI models in one place. That’s totally amazing!`,
    rating: 5,
    author: 'Andrew Roberts',
    designation: 'UX Writer',
    image: IMAGES.avatar3,
  },
  {
    id: '3',
    heading: 'Best AI Assistant',
    content: `Chatify has been a lifesaver for my content needs. The AI creates amazing visuals and marketing copy that actually sounds human - it's cut my work time in half.`,
    rating: 5,
    author: 'Sara Williams',
    designation: 'Marketing Specialist',
    image: IMAGES.avatar2,
  },
];
const ReviewCarousel: React.FC = () => {
  const theme = useTheme();

  // Duplicate content for seamless loop
  const doubledReviews = [...reviews, ...reviews];

  return (
    <Box
      sx={{
        maxWidth: 'calc(min(80vw, 1000px) - 360px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: 'scroll-left 30s linear infinite',
          '@keyframes scroll-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {doubledReviews.map((review, index) => (
          <ColumnBox
            key={`${review.id}-${index}`}
            alignItems='stretch'
            justifyContent='flex-start'
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              padding: 2,
              margin: 1,
              borderRadius: 2,
              width: '320px',
            }}
            gap={1}
          >
            <Typography variant='body2' fontWeight='bold' fontSize={16}>
              {review.heading}
            </Typography>
            {review.rating && (
              <RowBox color='#ffa71a'>
                {Array.from({ length: review.rating }, () => (
                  <StarSVG />
                ))}
              </RowBox>
            )}
            <Typography variant='body2' fontSize={14} minHeight={110}>
              {review.content}
            </Typography>
            <RowBox gap={1}>
              <img src={review.image} width='28px' style={{ borderRadius: '20px' }} />
              <Typography fontSize={14} fontWeight='bold'>
                {review.author}
                {'  '} -
              </Typography>
              <Typography fontSize={13} mt={'1px'} color='text.secondary'>
                {review.designation}
              </Typography>
            </RowBox>
          </ColumnBox>
        ))}
        {doubledReviews.map((review, index) => (
          <ColumnBox
            key={`${review.id}-${index}`}
            alignItems='stretch'
            justifyContent='flex-start'
            sx={{
              backgroundColor: theme.palette.primary.contrastText,
              padding: 2,
              margin: 1,
              borderRadius: 2,
              width: '320px',
            }}
            gap={1}
          >
            <Typography variant='body2' fontWeight='bold' fontSize={16}>
              {review.heading}
            </Typography>
            {review.rating && (
              <RowBox color='#ffa71a'>
                {Array.from({ length: review.rating }, () => (
                  <StarSVG />
                ))}
              </RowBox>
            )}
            <Typography variant='body2' fontSize={14} minHeight={110}>
              {review.content}
            </Typography>
            <RowBox gap={1}>
              <img src={review.image} width='28px' style={{ borderRadius: '20px' }} />
              <Typography fontSize={14} fontWeight='bold'>
                {review.author}
                {'  '} -
              </Typography>
              <Typography fontSize={13} mt={'1px'} color='text.secondary'>
                {review.designation}
              </Typography>
            </RowBox>
          </ColumnBox>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewCarousel;
