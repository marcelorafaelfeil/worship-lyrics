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
import { useDispatch } from 'react-redux';
import { openLyric } from '../LyricSlice';
import GetLyrics from './GetLyrics';
import { ILyric } from './ILyric';

const items: ILyric[] = GetLyrics();

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
  const dispatch = useDispatch();

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
        onItemInvoked={(data: ILyric) => dispatch(openLyric(data))}
      />
    </Stack>
  );
}
