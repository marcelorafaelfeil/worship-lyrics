import * as $log from 'electron-log';
import fs from 'fs';
import configurationService from '../../sidebar/configuration/configuration-screen/configurationService';
import { ILyric } from './ILyric';

export default function GetLyrics() {
  const { getConfig } = configurationService();

  const data: ILyric[] = [];
  let index = 0;

  const { directory } = getConfig().lyrics;

  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  } catch (error) {
    $log.error('Não foi possível criar o diretório.', error);
  }
  try {
    fs.readdirSync(directory).forEach((folder) => {
      fs.readdirSync(`${directory}/${folder}`).forEach((file) => {
        const content = fs.readFileSync(`${directory}/${folder}/${file}`, {
          encoding: 'utf-8',
        });
        const splitFile = file.split('.');
        const fileName = file.replace(
          `.${splitFile[splitFile.length - 1]}`,
          ''
        );

        data.push({
          key: index,
          music: fileName,
          lyric: content,
          artist: folder,
        });
        index += 1;
      });
    });
  } catch (error) {
    $log.error('Não foi possível abrir o diretório com as letras.', error);
  }

  return data;
}
