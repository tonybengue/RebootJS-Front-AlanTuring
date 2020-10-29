import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Router } from 'react-router-dom';
import './App.css';
import AppLayout from './Layout/components/AppLayout';
import history from './history';
import { blue, red } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import { store } from './store';

import { makeInitApp } from './Layout/actions/makeInitApp';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from './appReducer';
import { Action } from 'redux';

const theme = createMuiTheme({
  palette: {
    primary: blue, // menu
    secondary: {
      main: "#f00"
    },
    error: red,
  },
});

// Manual init of the timer to get messages periodically
(store.dispatch as ThunkDispatch<IAppState, void, Action>)(makeInitApp());

// export const lightTheme = createMuiTheme({
//   palette: {
//     type: 'dark',   // Name of the theme
//     primary: {
//       main: '#152B38',
//     },
//     secondary: {
//       main: '#65C5C7',
//     },
//     contrastThreshold: 3,
//     tonalOffset: 0.2,
//   },
// });

function App() {
  return (
    // Store of redux
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <AppLayout />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
