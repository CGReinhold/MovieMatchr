import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/state';
import AppRouter from './AppRouter';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
