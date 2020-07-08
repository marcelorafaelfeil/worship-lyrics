import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { createTheme, Customizations, initializeIcons } from '@fluentui/react';
import { Store } from '../store';
import Routes from '../Routes';

initializeIcons();

type Props = {
  store: Store;
  history: History;
};

const myTheme = createTheme({
  palette: {
    themePrimary: '#ffffff',
    themeLighterAlt: '#767676',
    themeLighter: '#a6a6a6',
    themeLight: '#c8c8c8',
    themeTertiary: '#d0d0d0',
    themeSecondary: '#dadada',
    themeDarkAlt: '#eaeaea',
    themeDark: '#f4f4f4',
    themeDarker: '#f8f8f8',
    neutralLighterAlt: '#151515',
    neutralLighter: '#1e1e1e',
    neutralLight: '#2e2e2e',
    neutralQuaternaryAlt: '#373737',
    neutralQuaternary: '#3f3f3f',
    neutralTertiaryAlt: '#606060',
    neutralTertiary: '#fafafa',
    neutralSecondary: '#fbfbfb',
    neutralPrimaryAlt: '#fcfcfc',
    neutralPrimary: '#f7f7f7',
    neutralDark: '#fdfdfd',
    black: '#fefefe',
    white: '#0a0a0a',
  },
});

Customizations.applySettings({ theme: myTheme });

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
