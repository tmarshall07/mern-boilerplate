import { post, get } from '../../lib/request';

export const getUser = async (dispatch) => {
  const res = await get('user');
  if (res.data?.user) {
    dispatch({
      type: 'SET_USER',
      payload: res.data.user,
    });
  }
};

export const register = async (dispatch, name, email, password) => {
  const res = await post('register', {
    name,
    email,
    password,
  });

  if (res.data.user) {
    dispatch({
      type: 'SET_USER',
      payload: res.data.user,
    });

    return { user: res.data.user };
  }

  return { error: res.data?.error || 'Sorry, something went wrong!' };
};

export const login = async (dispatch, email, password) => {
  const res = await post('login', {
    email,
    password,
  });

  if (res.data?.user) {
    dispatch({
      type: 'LOGIN',
      payload: res.data.user,
    });

    return { user: res.data.user };
  }

  return { error: res.data?.error };
};

export const logOut = async () => {
  const res = await get('logout');

  if (res.data.success) {
    window.location.href = '/';
  }

  return false;
};

export const toggleLoginWindow = (dispatch, isVisible) =>
  dispatch({
    type: 'SET_LOGIN_WINDOW_VISIBLE',
    payload: isVisible,
  });
