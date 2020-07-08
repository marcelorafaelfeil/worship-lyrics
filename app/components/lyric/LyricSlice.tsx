import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import { ILyric } from './lyrics-list/ILyric';
import { PresentLyricService } from './lyric-preset/PresentLyricService';

console.log('quantidade de vezes!');

const server = new PresentLyricService();
server.initServer();

const lyricSlice = createSlice({
  name: 'lyric',
  initialState: { value: {} as ILyric, verse: '' },
  reducers: {
    openLyric: (state, data) => {
      state.value = data.payload;
    },
    selectVerse: (state, data) => {
      state.verse = data.payload;
      server.updateLyric(state.verse);
    },
  },
});

export const { openLyric, selectVerse } = lyricSlice.actions;

export default lyricSlice.reducer;

export const selectedLyric = (state: RootState) => state.lyric.value;
export const selectedVerse = (state: RootState) => state.lyric.verse;
