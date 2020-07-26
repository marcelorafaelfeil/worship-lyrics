import { app } from 'electron';
import * as $log from 'electron-log';
import { createServer } from 'http';
import { IConfiguration } from '../../components/sidebar/configuration/configuration-screen/configurationService';
import { configuration } from '../../core/configuration';

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

export const HTTP_CONFIG = {
  templateFolder: 'D:/projects/developer.pro.br/worship-lyrics/template/',
  templateFile: 'index.html',
};

export class StartServerService {
  constructor(public server?, public config?: IConfiguration) {
    this.server = '';
    this.config = configuration().getConfig();
  }

  startWS() {
    try {
      $log.debug('Inicializando socket.');
      const server = createServer();
      const wss = new WebSocket.Server({ server });

      wss.on('connection', (ws) => {
        ws.on('message', (data) => {
          wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
          });
        });
      });

      server.listen(this.config?.server.ws);
      $log.debug(
        `Socket inicializado com sucesos na porta ${this.config?.server.ws.port}`
      );
    } catch (err) {
      $log.error('Não foi possível inicializar o websocket.', err);
    }
  }

  startHTTP() {
    try {
      this.server = createServer((req, res) => {
        let file = req.url;

        if (req.url === '/') {
          file = '/index.html';
        }

        if (file !== '/favicon.ico') {
          const indexFile = fs.readFileSync(
            path.join(app.getPath('exe'), '..', 'template', file),
            {
              encoding: 'utf-8',
            }
          );

          res.writeHead(200, {
            'Content-Type': file?.includes('.js')
              ? 'text/javascript'
              : 'text/html',
            'Access-Control-Allow-Origin': '*',
          });
          res.write(indexFile);
        }
        res.end();
      }).listen(this.config?.server.http.port);
      $log.debug(
        `Server HTTP inicializado com sucesos na porta ${this.config?.server.http.port}`
      );
    } catch (err) {
      $log.error('Não foi possível inicializar o servidor HTTP.', err);
    }
  }

  execute() {
    this.startWS();
    this.startHTTP();
  }
}
