import * as $log from 'electron-log';
import configurationService from '../../sidebar/configuration/configuration-screen/configurationService';

export function presentLyricService() {
  let lyric;
  const { getConfig } = configurationService();

  function sendLyric(data) {
    $log.info('chegou aqui? data:', data);
    $log.debug(
      `Conectando: ws://localhost:${
        getConfig().server.ws.port
      }/connection/message`
    );
    const ws = new WebSocket(
      `ws://localhost:${getConfig().server.ws.port}/connection/message`
    );
    ws.addEventListener('open', function open() {
      $log.debug('Enviando mensagem: ', data);
      ws.send(data);
      ws.close();
    });
    ws.onerror = (err) => {
      $log.error('Erro ao conectar com o socket.', err);
    };
  }

  function updateLyric(data) {
    lyric = data;
    sendLyric(lyric);
  }

  function lastLyric() {
    return lyric;
  }

  return {
    sendLyric,
    updateLyric,
    lastLyric,
  };
}
