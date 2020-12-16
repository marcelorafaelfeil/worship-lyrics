import { Stack } from '@fluentui/react';
import { log } from 'electron-log';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IVerse } from '../lyrics-list/IVerse';
import { selectVerse } from '../LyricSlice';
import styles from './LyricPresent.css';

interface LyricPresentProps {
  verse: IVerse;
  isSelected: boolean;
}

const onSelectVerse = (dispatch, verse) => {
  dispatch(selectVerse(verse));
};

export default function Verse(props: LyricPresentProps) {
  const { verse, isSelected } = props;
  const dispatch = useDispatch();

  const verseClasses = [styles.verse];

  if (isSelected) {
    verseClasses.push(styles.selectedVerse);
  } else {
    const index = verseClasses.findIndex((stl) => styles.selectedVerse === stl);
    if (index >= 0) {
      verseClasses.splice(index, 1);
    }
  }

  return (
    <Stack
      className={verseClasses.join(' ')}
      onClick={() => onSelectVerse(dispatch, verse)}
    >
      {verse.value}
    </Stack>
  );
}
