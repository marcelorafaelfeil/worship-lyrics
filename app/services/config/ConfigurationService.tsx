import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const configSlice = createSlice({
  name: 'configuration',
  initialState: {
    http: {
      port: 4000,
    },
    ws: {
      port: 4001,
    },
  },
  reducers: {
    setHttpPort: (state, data) => {
      state.http = data.payload;
    },
    setWs: (state, data) => {
      state.ws = data.payload;
    },
  },
});

export const { setHttpPort, setWs } = configSlice.actions;

export default configSlice.reducer;

export const config = (state: RootState) => state.configuration;
