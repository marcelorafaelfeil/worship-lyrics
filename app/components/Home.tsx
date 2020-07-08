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

const stackStyle: IStackStyles = {
  root: {
    height: '100vh',
    backgroundColor: 'transparent',
  },
};
const sidebarStyle: IStackItemStyles = {
  root: {
    width: 260,
    background: hexToRgba(DefaultPalette.neutralDark, '0.99'),
  },
};
const contentStyle: IStackItemStyles = {
  root: {
    background: DefaultPalette.black,
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
        <Stack.Item styles={contentStyle} grow={4}>
          Olá mundo!
        </Stack.Item>
        <Stack.Item styles={contentStyle} grow={1}>
          Olá mundo!
        </Stack.Item>
      </Stack>
    </Fabric>
  );
}
