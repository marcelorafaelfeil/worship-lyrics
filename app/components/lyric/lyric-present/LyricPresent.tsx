/* eslint-disable react/no-danger */
import { Stack } from '@fluentui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { IVerse } from '../lyrics-list/IVerse';
import { lyricPrepare } from '../lyrics-list/LyricFormat';
import { selectedVerse } from '../LyricSlice';

interface LyricPresentProps {
  lyric: string;
}

export function LyricPresent(props: LyricPresentProps) {
  const { lyric } = props;

  const verse: IVerse = useSelector(selectedVerse);

  return <Stack>{lyricPrepare(lyric, verse)}</Stack>;
}
