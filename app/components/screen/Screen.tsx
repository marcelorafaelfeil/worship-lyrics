import { Stack } from '@fluentui/react';
import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { IVerse } from '../lyric/lyrics-list/IVerse';
import { selectedVerse } from '../lyric/LyricSlice';
import styles from './Screen.css';

const screenStyle: CSSProperties = {
  fontSize: '5vw',
  fontFamily: 'Arial Black, sans-serif',
  textShadow:
    '2px 0 0 #000000, -2px 0 0 #000000, 0 2px 0 #000000, 0 -2px 0 #000000, 1px 1px #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000',
};

export default function Screen() {
  const verse: IVerse = useSelector(selectedVerse);

  return (
    <Stack className={styles.screenContent}>
      <div className={styles.screenLyric} style={screenStyle}>
        {verse.value}
      </div>
    </Stack>
  );
}
