import React from 'react';
import Verse from '../lyric-preset/Verse';

export const lyricPrepare = (lyric: string) => {
  let blockTexts;
  if (lyric) {
    blockTexts = lyric
      .split('\r\n')
      .map((item, key) => <Verse key={key.toString()} value={item} />);
  }
  return blockTexts;
};
