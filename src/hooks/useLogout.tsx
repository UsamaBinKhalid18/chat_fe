import { useDispatch } from 'react-redux';

import { api } from 'src/apis/api.ts';
import { logOut } from 'src/redux/reducers/authSlice.ts';

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(api.util.resetApiState());
    dispatch(logOut());
  };
};
