import { app, ipcMain } from 'electron';
import * as $log from 'electron-log';
import * as fs from 'fs';
import * as path from 'path';
import defaultConfig from '../config/default-configuration.json';

const CONFIG_PATH = path.join(app.getAppPath(), '..', 'config');
const CONFIG_FILE = path.join(CONFIG_PATH, 'conf.json');

const TEMPLATE_FILE = path.join(
  process.env.NODE_ENV === 'production' ? app.getPath('exe') : app.getAppPath(),
  '..',
  'template',
  'index.html'
);

export function configuration() {
  function getConfig() {
    try {
      const configFile = fs.readFileSync(CONFIG_FILE, { encoding: 'utf8' });
      return JSON.parse(configFile);
    } catch (err) {
      $log.error('Erro interno ao ler o arquivo de configurações');
      throw new Error(err);
    }
  }

  function readConfig(event) {
    event.returnValue = getConfig();
  }

  function saveTemplateFile(_event, ports) {
    try {
      $log.debug('Salvando template.', ports);
      let htmlFile = fs.readFileSync(TEMPLATE_FILE).toString('utf8');
      htmlFile = htmlFile.replace(
        /(ws:\/\/localhost):[0-9]{4}/,
        `$1:${ports.wsPort}`
      );
      htmlFile = htmlFile.replace(
        /(http:\/\/localhost):[0-9]{4}/,
        `$1:${ports.httpPort}`
      );
      fs.writeFileSync(TEMPLATE_FILE, htmlFile);
    } catch (err) {
      $log.error('Erro interno ao salvar o template.', err);
    }
  }

  function saveConfig(_event, data) {
    try {
      $log.debug('Salvando arquivo de configurações.', data);
      fs.writeFileSync(CONFIG_FILE, data);
    } catch (err) {
      $log.error('Erro interno ao salvar o arquivo de configurações.', err);
    }
  }

  function initConfiguration() {
    try {
      if (!fs.existsSync(CONFIG_FILE)) {
        fs.mkdirSync(CONFIG_PATH, { recursive: true });

        const defaultData = JSON.stringify(defaultConfig);

        fs.writeFileSync(CONFIG_FILE, defaultData);
      }

      ipcMain.on('config:read', readConfig);
      ipcMain.on('config:save', saveConfig);
      ipcMain.on('config:template:save', saveTemplateFile);
    } catch (err) {
      $log.error('Não foi possível criar as configurações iniciais.', err);
      throw new Error(err);
    }
  }

  return {
    initConfiguration,
    getConfig,
  };
}
