import React, { CSSProperties } from 'react';
import { Stack, IStyle } from '@fluentui/react';
import { useSelector } from 'react-redux';
import { selectedVerse } from '../lyric/LyricSlice';
import styles from './Screen.css';

const screenStyle: CSSProperties = {
  fontSize: 72,
  fontFamily: 'Arial Black, sans-serif',
  textShadow:
    '2px 0 0 #000000, -2px 0 0 #000000, 0 2px 0 #000000, 0 -2px 0 #000000, 1px 1px #000000, -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000',
};

export default function Screen() {
  const value: string = useSelector(selectedVerse);

  return (
    <Stack className={styles.screenContent}>
      <div className={styles.screenLyric} style={screenStyle}>
        {value}
      </div>
    </Stack>
  );
}
