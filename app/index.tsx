import { DefaultPalette } from '@fluentui/react';
import { Color, Titlebar } from 'custom-electron-titlebar';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './app.global.css';
import Root from './containers/Root';
import { configuredStore, history } from './store';

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const titleBar = new Titlebar({
  backgroundColor: Color.fromHex(DefaultPalette.black),
  titleHorizontalAlignment: 'left',
});
titleBar.updateTitle('Worship Lyrics');

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
