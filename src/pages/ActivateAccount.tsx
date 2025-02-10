import { Navigate, useParams } from 'react-router-dom';

import { useActivateUserQuery } from 'src/apis/authApi';
import ColumnBox from 'src/components/common/ColumnBox';

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const { isLoading, isError, isSuccess } = useActivateUserQuery({
    uid: uid ?? '',
    token: token ?? '',
  });

  if (isLoading) {
    return <ColumnBox height='100%'>Activating your account...</ColumnBox>;
  }

  if (isError) {
    return (
      <ColumnBox height='100%'>
        Error activating your account. You may have used an invalid or expired activation url.
      </ColumnBox>
    );
  }
  if (isSuccess) {
    return <Navigate to='/' replace={true} />;
  }
}
