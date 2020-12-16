import {
  CommandBarButton,
  IIconProps,
  IStackItemStyles,
  IStackTokens,
  Stack,
} from '@fluentui/react';
import { ipcRenderer } from 'electron';
import * as $log from 'electron-log';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { presentLyricService } from '../../lyric/lyric-present/presentLyricService';
import { clearVerse } from '../../lyric/LyricSlice';
import styles from './LyricsMenu.css';

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    display: 'flex',
    height: 50,
    justifyContent: 'center',
  },
};

export function LyricsMenu() {
  const dispatch = useDispatch();

  /* const fontIcon: IIconProps = {
    iconName: 'Font',
  }; */
  const liveIcon: IIconProps = {
    iconName: 'Play',
  };
  const stopIcon: IIconProps = {
    iconName: 'Stop',
  };

  const { clear } = presentLyricService();

  const [isLive, setIsLive] = useState(
    ipcRenderer.sendSync('server:isOpenned')
  );

  const doLive = () => {
    if (ipcRenderer.sendSync('server:isOpenned')) {
      $log.debug('Parando servidor.');
      ipcRenderer.send('server:close');
    } else {
      $log.debug('Incializando servidor.');
      ipcRenderer.send('server:start');
    }

    $log.info('Status servidor: ', ipcRenderer.sendSync('server:isOpenned'));
    setIsLive(ipcRenderer.sendSync('server:isOpenned'));
  };

  /* const openFontScreen = () => {
    dispatch(clearVerse());
    clear();
  }; */

  const doClear = () => {
    dispatch(clearVerse());
    clear();
  };

  return (
    <Stack horizontal tokens={stackTokens} className={styles.contentButton}>
      <Stack.Item styles={stackItemStyles}>
        {/* <CommandBarButton
          primary
          className={[styles.actionButtons, styles.fontButton].join(' ')}
          onClick={openFontScreen}
          iconProps={fontIcon}
        /> */}
      </Stack.Item>
      <Stack.Item grow={1} styles={stackItemStyles}>
        <CommandBarButton
          primary
          className={[styles.actionButtons, styles.clearButton].join(' ')}
          onClick={doClear}
          text="Clear"
        />
        {!isLive && (
          <CommandBarButton
            primary
            className={[styles.actionButtons, styles.liveButton].join(' ')}
            iconProps={liveIcon}
            onClick={doLive}
            text="Live"
          />
        )}
        {isLive && (
          <CommandBarButton
            primary
            className={[styles.actionButtons, styles.stopButton].join(' ')}
            iconProps={stopIcon}
            onClick={doLive}
            text="Live"
          />
        )}
      </Stack.Item>
    </Stack>
  );
}
