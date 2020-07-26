import { ipcRenderer } from 'electron';
import * as $log from 'electron-log';
import * as _ from 'lodash';

export interface IConfiguration {
  lyrics: {
    directory: string;
  };
  server: {
    ws: {
      port: number | undefined;
    };
    http: {
      port: number | undefined;
    };
  };
}

export default function configurationService() {
  let config: IConfiguration = {} as IConfiguration;

  function loadConfig() {
    try {
      config = ipcRenderer.sendSync('config:read') as IConfiguration;
      return config;
    } catch (error) {
      $log.error('Não foi possível abrir o arquivo de configuração.', error);
      return {};
    }
  }

  function getConfig() {
    return _.cloneDeep(config);
  }

  function updateTemplate(newConf: IConfiguration) {
    ipcRenderer.send('config:template:save', {
      wsPort: newConf.server.ws.port,
      httpPort: newConf.server.http.port,
    });
  }

  function saveConfig(data: IConfiguration) {
    const mergedObjects = _.mergeWith(getConfig(), data, (a, b) => {
      return b === null ? a : undefined;
    });
    const jsonData = JSON.stringify(mergedObjects);
    ipcRenderer.send('config:save', jsonData);
    updateTemplate(mergedObjects);
  }

  loadConfig();

  return {
    getConfig,
    saveConfig,
  };
}
