/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IDetailsListStyles,
  Selection,
  SelectionMode,
  Stack,
  Text,
  DefaultPalette,
  DetailsRow,
  mergeStyleSets,
  IDetailsHeaderStyles,
  IDetailsListProps,
  DetailsHeader,
  IDetailsRowStyles,
} from '@fluentui/react';
import React, { useState } from 'react';
import { ILyric } from '../../lyric/lyrics-list/ILyric';
import styles from './SelectedLyrics.css';

export default function SelectedLyrics() {
  const [setSelectionDetails] = useState({});

  const classNames = mergeStyleSets({
    root: {
      selectors: {
        '.is-selected': {
          backgroundColor: DefaultPalette.neutralPrimary,
        },
      },
    },
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

  const items: ILyric[] = [
    {
      key: 1,
      artist: 'Gabriela Rocha',
      music: 'Diz',
      lyric: '',
    },
    {
      key: 2,
      artist: 'Gabriela Rocha',
      music: 'Atos 2',
      lyric: '',
    },
    {
      key: 3,
      artist: 'Gabriela Rocha',
      music: 'Lugar Secreto',
      lyric: '',
    },
  ];
  const columns: IColumn[] = [
    {
      key: 'columnMusic',
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
    },
    {
      key: 'columnArtist',
      name: 'Artista',
      fieldName: 'artist',
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
    },
  ];

  const getKey = (item: any) => {
    return item.key;
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

  const onRenderRow: IDetailsListProps['onRenderRow'] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      customStyles.root = { backgroundColor: DefaultPalette.neutralDark };
      return (
        <DetailsRow
          className={classNames.row}
          {...props}
          styles={customStyles}
        />
      );
    }
    return null;
  };

  const onRenderHeader: IDetailsListProps['onRenderDetailsHeader'] = (
    props
  ) => {
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

  const selection = new Selection({
    onSelectionChanged: () => {
      setSelectionDetails(getSelectionDetails());
    },
  });

  const getSelectionDetails = () => {
    const selectionCount = selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return `1 item selected: ${
          (selection.getSelection()[0] as ILyric).music
        }`;
      default:
        return `${selectionCount} items selected`;
    }
  };

  return (
    <Stack>
      <Stack>
        <Text className={styles.title}>Letras Selecionadas</Text>
      </Stack>
      <Stack>
        <DetailsList
          items={items}
          compact
          className={classNames.root}
          columns={columns}
          selectionMode={SelectionMode.multiple}
          checkboxVisibility={CheckboxVisibility.hidden}
          getKey={getKey}
          setKey="multiple"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible
          styles={listStyle}
          selection={selection}
          onRenderDetailsHeader={onRenderHeader}
          onRenderRow={onRenderRow}
          selectionPreservedOnEmptyClick
          enterModalSelectionOnTouch
        />
      </Stack>
    </Stack>
  );
}
