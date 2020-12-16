import { INavLinkGroup, Nav, Stack } from '@fluentui/react';
import * as React from 'react';
import LyricsList from '../lyric/lyrics-list/LyricsList';
import Configuration from './configuration/Configuration';
import SelectedLyrics from './selected-lyrics/SelectedLyrics';
import styles from './Sidebar.css';

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
const sidebarStyle: React.CSSProperties = {
  position: 'relative',
  height: '100vh',
};

export default function Sidebar(): JSX.Element {
  return (
    <Stack style={sidebarStyle}>
      {/* <Stack>
        <Nav
          ariaLabel="Nav example with custom group headers"
          groups={navLinkGroups}
          styles={navStyle}
        />
      </Stack>
      <Stack>
        <SearchLyric />
      </Stack> */}
      <Stack className={styles.contentResizableBlock}>
        <Stack className={styles.resizableBlock}>
          <LyricsList />
        </Stack>
        <Stack className={styles.resizerDivider} />
        <Stack className={styles.resizableBlock}>
          <SelectedLyrics />
        </Stack>
      </Stack>
      <Configuration />
    </Stack>
  );
}
