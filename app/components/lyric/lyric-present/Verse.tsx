import React from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@fluentui/react';
import { selectVerse } from '../LyricSlice';
import styles from './LyricPresent.css';

interface LyricPresentProps {
  value: string;
}

const onSelectVerse = (dispatch, value) => {
  dispatch(selectVerse(value));
};

export default function Verse(props: LyricPresentProps) {
  const { value } = props;
  const dispatch = useDispatch();

  return (
    <Stack
      className={styles.verse}
      onClick={() => onSelectVerse(dispatch, value)}
    >
      {value}
    </Stack>
  );
}
