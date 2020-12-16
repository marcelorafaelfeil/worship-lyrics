import { CommandBarButton, IIconProps, Stack } from '@fluentui/react';
import { ipcRenderer } from 'electron';
import * as $log from 'electron-log';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { presentLyricService } from '../../lyric/lyric-present/presentLyricService';
import { clearVerse } from '../../lyric/LyricSlice';
import styles from './LyricsMenu.css';

export function LyricsMenu() {
  const dispatch = useDispatch();

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

  const doClear = () => {
    dispatch(clearVerse());
    clear();
  };

  return (
    <Stack horizontal className={styles.contentButton}>
      <CommandBarButton
        primary
        className={styles.clearButton}
        onClick={doClear}
        text="Clear"
      />
      {!isLive && (
        <CommandBarButton
          primary
          className={styles.liveButton}
          iconProps={liveIcon}
          onClick={doLive}
          text="Live"
        />
      )}
      {isLive && (
        <CommandBarButton
          primary
          className={styles.stopButton}
          iconProps={stopIcon}
          onClick={doLive}
          text="Live"
        />
      )}
    </Stack>
  );
}
