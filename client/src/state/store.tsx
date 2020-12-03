import React, { createContext, useReducer } from 'react';

import reducer from './reducer';
import initialState, { StateProps } from './initialState';

type ContextProps = {
  dispatch: React.Dispatch<React.SetStateAction<undefined>> | undefined;
  state: StateProps;
};

// Export the store
export const Store = createContext<ContextProps>({
  dispatch: undefined,
  state: initialState,
});

// Export the store provider
function StoreProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}

export default StoreProvider;
