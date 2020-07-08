import { INavLinkGroup, Nav, Stack } from '@fluentui/react';
import * as React from 'react';
import SearchLyric from './search-lyric/SearchLyric';
import LyricsList from '../lyric/lyrics-list/LyricsList';

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Nova letra',
        url: 'http://msn.com',
        key: 'key1',
        target: '_blank',
        icon: 'Add',
      },
    ],
  },
];
const navStyle = {
  groupContent: {
    marginBottom: 15,
  },
};

export default function Sidebar(): JSX.Element {
  return (
    <Stack>
      <Stack>
        <Nav
          ariaLabel="Nav example with custom group headers"
          groups={navLinkGroups}
          styles={navStyle}
        />
      </Stack>
      <Stack>
        <SearchLyric />
      </Stack>
      <Stack>
        <LyricsList />
      </Stack>
    </Stack>
  );
}
