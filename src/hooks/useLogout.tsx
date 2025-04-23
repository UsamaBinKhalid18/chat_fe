import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/apis/api.ts';
import { logOut } from 'src/redux/reducers/authSlice.ts';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(api.util.resetApiState());
    dispatch(logOut());
    navigate('/');
  };
};
