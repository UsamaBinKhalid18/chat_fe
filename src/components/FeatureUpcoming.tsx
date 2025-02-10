import { Box, Link, Modal, Typography } from '@mui/material';

import { Player } from '@lottiefiles/react-lottie-player';
import animation from 'src/assets/animations/feature-upcoming.json';
import { COLORS } from 'src/theme/colors';

import ColumnBox from './common/ColumnBox';
interface FeatureUpcomingProps {
  open: boolean;
  featureName: string;
  onClose: () => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: COLORS.gradient.start,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function FeatureUpcoming({ open, featureName, onClose }: FeatureUpcomingProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Player autoplay loop src={animation} style={{ width: 350 }}></Player>
        <ColumnBox gap={1}>
          <Typography variant='h6' color='white' textAlign='center'>
            {featureName} is coming soon!
          </Typography>
          <Typography color='grey' textAlign='center'>
            Our team is working to bring you this feature.Let us know your expectations <br />
            <Link underline='hover' color='lightgrey' href='mailto:wish@chatapp.com'>
              wish@chatapp.com
            </Link>
          </Typography>
        </ColumnBox>
      </Box>
    </Modal>
  );
}
