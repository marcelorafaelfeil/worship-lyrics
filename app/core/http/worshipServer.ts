import { ipcMain } from 'electron';
import * as $log from 'electron-log';
import { createServer, Server as HttpServer } from 'http';
import { configuration, TEMPLATE_PATH } from '../configuration';

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

export const HTTP_CONFIG = {
  templateFolder: 'D:/projects/developer.pro.br/worship-lyrics/template/',
  templateFile: 'index.html',
};

export function worshipServer() {
  const config = configuration().getConfig();
  let wsServer: HttpServer;
  let wssServer;
  let httpServer: HttpServer;

  function startWS() {
    try {
      const port = config?.server.ws.port;

      $log.debug(`Inicializando socket na porta ${port}.`);

      wsServer = createServer();
      wssServer = new WebSocket.Server({ server: wsServer });

      wssServer.on('connection', (ws) => {
        ws.on('message', (data) => {
          wssServer.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
          });
        });
      });

      wsServer.listen(port);
      $log.debug(`Socket inicializado com sucesos na porta ${port}`);
    } catch (err) {
      $log.error('Não foi possível inicializar o websocket.', err);
    }
  }

  function startHTTP() {
    try {
      httpServer = createServer((req, res) => {
        let file = req.url;

        if (req.url === '/') {
          file = '/index.html';
        }

        if (file !== '/favicon.ico') {
          const indexFile = fs.readFileSync(path.join(TEMPLATE_PATH, file), {
            encoding: 'utf-8',
          });

          res.writeHead(200, {
            'Content-Type': file?.includes('.js')
              ? 'text/javascript'
              : 'text/html',
            'Access-Control-Allow-Origin': '*',
          });
          res.write(indexFile);
        }
        res.end();
      }).listen(config?.server.http.port);

      $log.debug(
        `Server HTTP inicializado com sucesos na porta ${config?.server.http.port}`
      );
    } catch (err) {
      $log.error('Não foi possível inicializar o servidor HTTP.', err);
    }
  }

  function start(event) {
    startWS();
    startHTTP();

    setTimeout(() => {
      event.reply('server:start');
    });
  }

  function close(event) {
    wsServer.close();
    wssServer.close();
    httpServer.close();
    event.reply('server:close');
  }

  function isOpenned(event) {
    event.returnValue =
      wsServer && wsServer.listening && httpServer && httpServer.listening;
  }

  function initialize() {
    ipcMain.on('server:start', start);
    ipcMain.on('server:close', close);
    ipcMain.on('server:isOpenned', isOpenned);
  }

  return {
    initialize,
  };
}
