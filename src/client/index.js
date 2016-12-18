import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import store from "./store"
import App from './components/App';
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', render);
}
