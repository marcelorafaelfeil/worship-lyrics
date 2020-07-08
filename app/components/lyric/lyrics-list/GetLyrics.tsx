import fs from 'fs';
import { ILyric } from './ILyric';

const PATH_EXPLORER = 'C:/lyrics/';

export default function GetLyrics() {
  const data: ILyric[] = [];
  let index = 0;
  fs.readdirSync(PATH_EXPLORER).forEach((folder) => {
    fs.readdirSync(`${PATH_EXPLORER}/${folder}`).forEach((file) => {
      const content = fs.readFileSync(`${PATH_EXPLORER}/${folder}/${file}`, {
        encoding: 'utf-8',
      });
      const splitFile = file.split('.');
      const fileName = file.replace(`.${splitFile[splitFile.length - 1]}`, '');

      data.push({
        key: index,
        music: fileName,
        lyric: content,
        artist: folder,
      });
      index += 1;
    });
  });

  return data;
}
