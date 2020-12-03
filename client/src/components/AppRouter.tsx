import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

import Main from './Main';
import { getUser } from '../state/user/actions';
import { Store } from '../state/store';

export default function AppRouter() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    dispatch,
    state: { user },
  } = useContext(Store);

  const init = async () => {
    await getUser(dispatch);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Router>
      {!isLoading && (
        <>
          <Route path="/login">
            {user && <Redirect to="/" />}
            <Login />
          </Route>
          <Route path="/signup">
            {user && <Redirect to="/" />}
            <Signup />
          </Route>
          <Route path="/" exact>
            {!user && <Redirect to="/login" />}
            <Main />
          </Route>
        </>
      )}
    </Router>
  );
}
