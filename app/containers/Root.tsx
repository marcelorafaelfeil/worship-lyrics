import { Customizations, initializeIcons } from '@fluentui/react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import Routes from '../Routes';
import { Store } from '../store';
import { darkTheme } from './DarkTheme';

initializeIcons();

type Props = {
  store: Store;
  history: History;
};

Customizations.applySettings({ theme: darkTheme });

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
