import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Main from './components/Main';
import { getUser } from './state/user/actions';
import StoreProvider, { Store } from './state/store';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StoreProvider>
          <AppRouter />
        </StoreProvider>
      </header>
    </div>
  );
}

export default App;
