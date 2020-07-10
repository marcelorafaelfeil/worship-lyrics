import { createServer } from 'http';
import fs from 'fs';
import ElectronLog from 'electron-log';

const WebSocket = window.require('ws');

export const HTTP_CONFIG = {
  templateFolder: 'D:/projects/developer.pro.br/worship-lyrics/template/',
  templateFile: 'index.html',
};

export class StartServerService {
  constructor(port) {
    this.server = null;
    this.port = port;
  }

  startWS() {
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

    server.listen(9000);
  }

  startHTTP() {
    this.server = createServer((req, res) => {
      const indexFile = fs.readFileSync(
        HTTP_CONFIG.templateFolder + HTTP_CONFIG.templateFile,
        {
          encoding: 'utf-8',
        }
      );

      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      });
      res.write(indexFile);
      res.end();
    }).listen(this.port);
  }

  execute() {
    this.startWS();
    this.startHTTP();
  }
}
