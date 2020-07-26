import configurationService from '../../sidebar/configuration/configuration-screen/configurationService';

export function presentLyricService() {
  let lyric;
  const { getConfig } = configurationService();

  function sendLyric(data) {
    const ws = new WebSocket(
      `ws://localhost:${getConfig().server.ws.port}/connection/message`
    );
    ws.addEventListener('open', function open() {
      ws.send(data);
    });
  }

  function updateLyric(data) {
    lyric = data;
    sendLyric(lyric);
  }

  return {
    sendLyric,
    updateLyric,
  };
}
