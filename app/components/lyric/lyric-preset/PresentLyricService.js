import { StartServerService } from '../../../services/http/StartServerService';

const WebSocket = window.require('ws');

export class PresentLyricService {
  constructor() {
    this.lyric = '';
    this.server = null;
  }

  updateLyric(lyric) {
    this.lyric = lyric;

    this.sendLyric(lyric);
  }

  initServer() {
    const server = new StartServerService(4000);
    return server.execute();
  }

  sendLyric(lyric) {
    const ws = new WebSocket('ws://localhost:9000/connection/message');

    ws.on('open', function open() {
      ws.send(lyric);
    });
  }
}
