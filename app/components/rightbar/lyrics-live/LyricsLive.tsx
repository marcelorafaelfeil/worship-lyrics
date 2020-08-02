import * as $log from 'electron-log';
import { CommandBarButton, IIconProps, Stack } from '@fluentui/react';
import { ipcRenderer } from 'electron';
import React, { useState } from 'react';
import styles from './LyricsLive.css';

export function LyricsMenu() {
  const liveIcon: IIconProps = {
    iconName: 'Play',
  };
  const stopIcon: IIconProps = {
    iconName: 'Stop',
  };

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

  return (
    <Stack horizontal className={styles.contentButton}>
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
