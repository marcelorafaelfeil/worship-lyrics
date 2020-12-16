import {
  DefaultPalette,
  Fabric,
  IStackItemStyles,
  IStackStyles,
  IStackTokens,
  Stack,
} from '@fluentui/react';
import * as React from 'react';
import hexToRgba from 'hex-to-rgba';
import Sidebar from './sidebar/Sidebar';
import RightBar from './rightbar/RightBar';
import Screen from './screen/Screen';

const stackStyle: IStackStyles = {
  root: {
    height: '100vh',
    backgroundColor: 'transparent',
  },
};
const sidebarStyle: IStackItemStyles = {
  root: {
    width: '30vh',
    background: hexToRgba(DefaultPalette.neutralDark, '0.99'),
  },
};
const contentStyle: IStackItemStyles = {
  root: {
    width: '40vh',
    overflow: 'hidden',
    background: DefaultPalette.black,
  },
};
const rightBar: IStackItemStyles = {
  root: {
    width: '30vh',
    background: DefaultPalette.neutralDark,
    marginBottom: 28,
  },
};

const stackTokens: IStackTokens = { childrenGap: '6 0', padding: 0 };

export default function Home(): JSX.Element {
  return (
    <Fabric>
      <Stack horizontal disableShrink styles={stackStyle} tokens={stackTokens}>
        <Stack.Item styles={sidebarStyle} align="auto" shrink={false}>
          <Sidebar />
        </Stack.Item>
        <Stack.Item styles={contentStyle} grow>
          <Screen />
        </Stack.Item>
        <Stack.Item styles={rightBar}>
          <RightBar />
        </Stack.Item>
      </Stack>
    </Fabric>
  );
}
