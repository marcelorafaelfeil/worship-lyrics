import {
  DefaultPalette,
  IStackItemStyles,
  IStackTokens,
  Stack,
  IStackStyles,
} from '@fluentui/react';
import * as React from 'react';
import Sidebar from './sidebar/Sidebar';

const stackStyle: IStackStyles = {
  root: {
    background: DefaultPalette.neutralPrimary,
    height: '100vh',
  },
};
const screenViewStyle: IStackItemStyles = {
  root: {
    background: DefaultPalette.neutralDark,
  },
};
const sidebarStyle: IStackItemStyles = {
  root: {
    borderRightWidth: 3,
    borderRightStyle: 'solid',
    borderRightColor: DefaultPalette.white,
  },
};

const stackTokens: IStackTokens = { childrenGap: '6 0', padding: 0 };

export default function Home(): JSX.Element {
  return (
    <Stack horizontal disableShrink styles={stackStyle} tokens={stackTokens}>
      <Stack.Item styles={sidebarStyle} align="auto" grow={1}>
        <Sidebar />
      </Stack.Item>
      <Stack.Item styles={screenViewStyle} grow={4}>
        Olá mundo!
      </Stack.Item>
      <Stack.Item grow={1}>Olá mundo!</Stack.Item>
    </Stack>
  );
}
