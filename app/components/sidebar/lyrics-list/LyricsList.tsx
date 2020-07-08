import {
  DefaultPalette,
  DetailsHeader,
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  IColumn,
  IDetailsHeaderStyles,
  IDetailsListProps,
  IDetailsListStyles,
  IDetailsRowStyles,
  mergeStyleSets,
  SelectionMode,
  Stack,
} from '@fluentui/react';
import React from 'react';

const classNames = mergeStyleSets({
  row: {
    cursor: 'default',
    userSelect: 'none',
    selectors: {
      ':hover': {
        backgroundColor: DefaultPalette.neutralPrimary,
      },
    },
  },
});

export interface ILyric {
  key: number;
  music: string;
  artist: string;
}

const columns: IColumn[] = [
  {
    key: 'column2',
    name: 'Música',
    fieldName: 'music',
    minWidth: 50,
    maxWidth: 150,
    isRowHeader: true,
    isResizable: true,
    isSorted: true,
    isSortedDescending: false,
    sortAscendingAriaLabel: 'Sorted A to Z',
    sortDescendingAriaLabel: 'Sorted Z to A',
    data: 'string',
    isPadded: true,
    headerClassName: classNames.row,
  },
  {
    key: 'column3',
    name: 'Artista',
    fieldName: 'artist',
    minWidth: 50,
    maxWidth: 150,
    isResizable: true,
    data: 'number',
    onRender: (item: ILyric) => {
      return <span>{item.artist}</span>;
    },
    isPadded: true,
    headerClassName: classNames.row,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getKey(item: any) {
  return item.key;
}

const items: ILyric[] = [
  {
    key: 1,
    artist: 'Gabriela Rocha',
    music: 'Atos 2',
  },
  {
    key: 2,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 3,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 4,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 5,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 6,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 7,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 8,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 9,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 10,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 11,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 12,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 13,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 14,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 15,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 16,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 17,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 18,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 19,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 20,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 21,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 22,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 23,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 24,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 25,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
  {
    key: 26,
    artist: 'Gabriela Rocha',
    music: 'O noivo vem',
  },
  {
    key: 27,
    artist: 'Morada',
    music: 'Oh! Se fendesses',
  },
  {
    key: 28,
    artist: 'Morada',
    music: 'É tudo sobre você',
  },
];

const onRenderRow: IDetailsListProps['onRenderRow'] = (props) => {
  const customStyles: Partial<IDetailsRowStyles> = {};
  if (props) {
    customStyles.root = { backgroundColor: DefaultPalette.neutralDark };
    return (
      <DetailsRow className={classNames.row} {...props} styles={customStyles} />
    );
  }
  return null;
};

const onRenderHeader: IDetailsListProps['onRenderDetailsHeader'] = (props) => {
  const customStyles: Partial<IDetailsHeaderStyles> = {};
  customStyles.root = { backgroundColor: DefaultPalette.neutralDark };
  return (
    <DetailsHeader
      layoutMode={DetailsListLayoutMode.justified}
      {...props}
      styles={customStyles}
    />
  );
};

const listStyle: IDetailsListStyles = {
  root: {},
  focusZone: {},
  headerWrapper: {},
  contentWrapper: {
    maxHeight: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
  },
};

export default function LyricsList() {
  return (
    <Stack>
      <DetailsList
        items={items}
        compact
        columns={columns}
        selectionMode={SelectionMode.none}
        getKey={getKey}
        setKey="multiple"
        layoutMode={DetailsListLayoutMode.justified}
        onRenderDetailsHeader={onRenderHeader}
        onRenderRow={onRenderRow}
        isHeaderVisible
        styles={listStyle}
      />
    </Stack>
  );
}
