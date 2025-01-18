import { Player } from '@lottiefiles/react-lottie-player';
import { Box, Link, Modal, Typography } from '@mui/material';
import { COLORS } from 'src/theme/colors';
import animation from 'src/assets/animations/feature-upcoming.json';
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
  width: 400,
  bgcolor: COLORS.gradient.start,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function FeatureUpcoming({ open, featureName, onClose }: FeatureUpcomingProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Player autoplay src={animation} style={{ width: 400 }}></Player>
        <ColumnBox gap={1}>
          <Typography variant='h6' color='white' textAlign='center'>
            Our team is working to bring you {featureName} soon!
          </Typography>
          <Typography color='grey' textAlign='center'>
            Let us know your expectations with the feature <br />
            <Link underline='hover' color='lightgrey' href='mailto:wish@chatapp.com'>
              wish@chatapp.com
            </Link>
          </Typography>
        </ColumnBox>
      </Box>
    </Modal>
  );
}
