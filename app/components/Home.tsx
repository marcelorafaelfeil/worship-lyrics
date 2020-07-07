import * as React from 'react';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  IStackTokens,
} from '@fluentui/react';

export default function Home(): JSX.Element {
  const stackTokens: IStackTokens = { childrenGap: 40 };

  return (
    <Stack horizontal tokens={stackTokens}>
      <DefaultButton text="Standard" allowDisabledFocus />
      <PrimaryButton text="Primary" allowDisabledFocus />
    </Stack>
  );
}
