import {
  DefaultPalette,
  IStackItemStyles,
  IStackStyles,
  IStackTokens,
  Stack,
} from '@fluentui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { LyricPresent } from '../lyric/lyric-present/LyricPresent';
import { ILyric } from '../lyric/lyrics-list/ILyric';
import { selectedLyric } from '../lyric/LyricSlice';
import { LyricsMenu } from './lyrics-live/LyricsLive';
import styles from './RightBar.css';

const outerStackTokens: IStackTokens = {
  childrenGap: 5,
};

const innerStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    height: '100vh',
  },
};

const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    color: DefaultPalette.white,
    display: 'flex',
  },
};

export default function RightBar() {
  const data: ILyric = useSelector(selectedLyric);

  return (
    <Stack tokens={outerStackTokens}>
      <Stack disableShrink styles={stackStyles} tokens={innerStackTokens}>
        <Stack.Item className={styles.contentButton}>
          <LyricsMenu />
        </Stack.Item>
        <Stack.Item styles={stackItemStyles}>
          <h2>
            {data.music}
            <small style={{ color: DefaultPalette.neutralSecondary }}>
              {data.artist}
            </small>
          </h2>
        </Stack.Item>
        <Stack.Item grow className={styles.contentLyric}>
          <LyricPresent lyric={data.lyric} />
        </Stack.Item>
      </Stack>
    </Stack>
  );
}
