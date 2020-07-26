/* eslint-disable import/no-cycle */
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import lyricReducer from './components/lyric/LyricSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    lyric: lyricReducer,
  });
}
