/* eslint-disable react/no-danger */
import React from 'react';
import { Stack } from '@fluentui/react';
import { lyricPrepare } from '../lyrics-list/LyricFormat';

interface LyricPresentProps {
  lyric: string;
}

export function LyricPresent(props: LyricPresentProps) {
  const { lyric } = props;

  return <Stack>{lyricPrepare(lyric)}</Stack>;
}
