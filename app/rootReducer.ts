import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import lyricReducer from './components/lyric/LyricSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    lyric: lyricReducer,
  });
}
