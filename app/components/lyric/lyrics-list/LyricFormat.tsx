import React from 'react';
import uuid from 'react-uuid';
import Verse from '../lyric-present/Verse';
import { IVerse } from './IVerse';

export const lyricPrepare = (lyric: string, value: IVerse) => {
  let blockTexts;
  if (lyric) {
    blockTexts = lyric.split('\r\n').map((item, index) => {
      const verse = { key: index, value: item };
      let isSelected = false;

      if (value && value.key === verse.key && value.value === verse.value) {
        isSelected = true;
      }

      return <Verse key={uuid()} verse={verse} isSelected={isSelected} />;
    });
  }
  return blockTexts;
};
