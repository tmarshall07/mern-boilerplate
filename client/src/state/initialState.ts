import UserProps from '../types/UserProps';

export type StateProps = {
  user: UserProps | null;
};

const initialState = {
  user: null,
};

export default initialState;
