/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import * as $log from 'electron-log';
import { RootState } from '../../store';
import { presentLyricService } from './lyric-present/presentLyricService';
import { ILyric } from './lyrics-list/ILyric';
import { IVerse } from './lyrics-list/IVerse';

const { updateLyric, lastLyric } = presentLyricService();

const lyricSlice = createSlice({
  name: 'lyric',
  initialState: { value: {} as ILyric, verse: {} as IVerse },
  reducers: {
    openLyric: (state, data) => {
      state.value = data.payload;
    },
    selectVerse: (state, data) => {
      state.verse = data.payload;
      updateLyric(state.verse?.value);
    },
    clearVerse: (state) => {
      state.verse = {} as IVerse;
      updateLyric(state.verse);
    },
  },
});

export const { openLyric, selectVerse, clearVerse } = lyricSlice.actions;

export default lyricSlice.reducer;

export const selectedLyric = (state: RootState) => state.lyric.value;
export const selectedVerse = (state: RootState) => state.lyric.verse;

ipcRenderer.on('server:start', () => {
  $log.info('lastLyric(): ', lastLyric());
  updateLyric(lastLyric());
});
