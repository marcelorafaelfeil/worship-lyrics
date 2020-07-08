import { DefaultPalette, Stack } from '@fluentui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { LyricPresent } from '../lyric/lyric-preset/LyricPresent';
import { ILyric } from '../lyric/lyrics-list/ILyric';
import { selectedLyric } from '../lyric/LyricSlice';
import styles from './RightBar.css';

export default function RightBar() {
  const data: ILyric = useSelector(selectedLyric);

  return (
    <Stack className={styles.rightbar}>
      <Stack>
        <h2>
          {data.music}
          <small style={{ color: DefaultPalette.neutralSecondary }}>
            {data.artist}
          </small>
        </h2>
      </Stack>
      <Stack>
        <LyricPresent lyric={data.lyric} />
      </Stack>
    </Stack>
  );
}
