import {
  DefaultPalette,
  ISearchBoxStyles,
  IStackTokens,
  SearchBox,
  Stack,
} from '@fluentui/react';
import React from 'react';

const stackTokens: Partial<IStackTokens> = { childrenGap: 10 };
const searchStyle: ISearchBoxStyles = {
  root: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: DefaultPalette.neutralSecondary,
    backgroundColor: DefaultPalette.neutralDark,
  },
};

export default function SearchLyric() {
  return (
    <Stack tokens={stackTokens}>
      <SearchBox styles={searchStyle} placeholder="Pesquisar letra" />
    </Stack>
  );
}
