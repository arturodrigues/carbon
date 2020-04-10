import React, { useState } from 'react';
import { boolean, withKnobs, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableRowHeader,
  FlatTableCell,
  FlatTableSortHeader
} from '.';
import Icon from '../icon';
import guid from '../../utils/helpers/guid';

export default {
  title: 'Test/Flat Table',
  component: FlatTable,
  decorators: [withKnobs]
};

export const basic = () => {
  const hasStickyHead = boolean('hasStickyHead', false);
  const hasHeaderRow = boolean('hasHeaderRow', false);
  const hasClickableRows = boolean('hasClickableRows', false);
  const colorTheme = select('colorTheme', [...OptionsHelper.flatTableThemes], 'transparent');
  const processed = getTableData();
  // used to show how the table behaves constrained or on lower resolutions
  const tableSizeConstraints = {
    height: 'auto',
    width: 'auto',
    overflowX: 'auto'
  };
  let onClickFn;
  let rowWithInputs;

  if (hasStickyHead) {
    tableSizeConstraints.height = '300px';
  }

  if (hasHeaderRow) {
    tableSizeConstraints.width = '600px';
  }

  if (hasClickableRows) {
    onClickFn = action('click');
    rowWithInputs = getRowWithInputs(onClickFn, hasHeaderRow);
  }

  return (
    <div style={ tableSizeConstraints }>
      <FlatTable
        colorTheme={ colorTheme }
        hasStickyHead={ hasStickyHead }
      >
        <FlatTableHead>
          <FlatTableRow key={ processed.headData.id }>
            {
              processed.headData.data.map((cellData, index) => {
                let Component = FlatTableHeader;

                if (index === 0 && hasHeaderRow) {
                  Component = FlatTableRowHeader;
                }

                return (
                  <Component key={ cellData.id }>
                    { cellData.content }
                  </Component>
                );
              })
            }
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {rowWithInputs}
          {
            processed.bodyData.map(rowData => (
              <FlatTableRow key={ rowData.id } onClick={ onClickFn }>
                {
                  rowData.data.map((cellData, index) => {
                    let Component = FlatTableCell;

                    if (index === 0 && hasHeaderRow) {
                      Component = FlatTableRowHeader;
                    }

                    return (
                      <Component key={ cellData.id } align={ cellData.align }>
                        {cellData.content}
                      </Component>
                    );
                  })
                }
              </FlatTableRow>
            ))
          }
        </FlatTableBody>
      </FlatTable>
    </div>
  );
};

export const Sortable = () => {
  const colorTheme = select('colorTheme', [...OptionsHelper.flatTableThemes], 'transparent');

  const headDataItems = [
    { name: 'client', isActive: false },
    { name: 'total', isActive: false }
  ];

  const bodyDataItems = [
    { client: 'Jason Atkinson', total: 1349 },
    { client: 'Monty Parker', total: 849 },
    { client: 'Blake Sutton', total: 3840 },
    { client: 'Tyler Webb', total: 280 }
  ];
  const [headData, setHeadData] = useState(headDataItems);
  const [bodyData, setBodyData] = useState(bodyDataItems);
  const [sortType, setSortType] = useState('asc');
  const sortByNumber = (dataToSort, sortByValue, type) => {
    const sortedData = dataToSort.sort((a, b) => {
      if (type === 'asc') {
        return a[sortByValue] - b[sortByValue];
      }

      if (type === 'desc') {
        return b[sortByValue] - a[sortByValue];
      }

      return 0;
    });

    return sortedData;
  };

  const sortByString = (dataToSort, sortByValue, type) => {
    const sortedData = dataToSort.sort((a, b) => {
      const nameA = a[sortByValue].toUpperCase();
      const nameB = b[sortByValue].toUpperCase();

      if (type === 'asc') {
        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }
      }

      if (type === 'desc') {
        if (nameA > nameB) {
          return -1;
        }

        if (nameA < nameB) {
          return 1;
        }
      }

      return 0;
    });

    return sortedData;
  };

  const handleClick = (e) => {
    const tempHeadData = headData;
    tempHeadData.forEach((item) => {
      item.isActive = false;
      if (item.name === e) {
        item.isActive = !item.isActive;
      }
    });

    setHeadData([...tempHeadData]);

    const sortByValue = e;
    let sortedData;

    if (typeof bodyData[0][sortByValue] === 'string') {
      sortedData = sortByString(bodyData, sortByValue, sortType);
    }

    if (typeof bodyData[0][sortByValue] === 'number') {
      sortedData = sortByNumber(bodyData, sortByValue, sortType);
    }

    setBodyData([...sortedData]);
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
  };

  const showSortIcon = (isActive) => {
    return isActive && <Icon type={ sortType === 'asc' ? 'sort_down' : 'sort_up' } />;
  };

  return (
    <FlatTable colorTheme={ colorTheme }>
      <FlatTableHead>
        <FlatTableRow>
          {
            headData.map((dataItem) => {
              return (
                <FlatTableSortHeader key={ dataItem.name } onClick={ () => handleClick(dataItem.name) }>
                  {dataItem.name}
                  {showSortIcon(dataItem.isActive)}
                </FlatTableSortHeader>
              );
            })
          }
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        {
          bodyData.map((dataItem) => {
            return (
              <FlatTableRow key={ dataItem.client }>
                <FlatTableCell>{dataItem.client}</FlatTableCell>
                <FlatTableCell>{dataItem.total}</FlatTableCell>
              </FlatTableRow>
            );
          })
        }
      </FlatTableBody>
    </FlatTable>
  );
};

basic.story = {
  name: 'Basic',
  parameters: {
    info: { disable: true },
    docs: {
      page: null
    }
  }
};

const headRowData = {
  client: 'Client',
  clientType: 'Client Type',
  categories: 'Categories',
  products: 'Products',
  finalAccDue: 'Final Account Due',
  corpTaxDue: 'Corp Tax Due',
  vatDue: 'VAT due'
};

const rowData = {
  client: (<div><h5 style={ { margin: 0 } }>Soylent Corp</h5>John Doe</div>),
  clientType: 'business',
  categories: 'Group1, Group2, Group3',
  products: 'Accounting',
  finalAccDue: '12/12/20',
  corpTaxDue: '20/12/20',
  vatDue: '25/12/20'
};

function getRowWithInputs(onClickFn, hasHeaderRow) {
  let firstRow = <FlatTableCell>Row with inputs</FlatTableCell>;

  if (hasHeaderRow) {
    firstRow = <FlatTableRowHeader>Row with inputs</FlatTableRowHeader>;
  }

  return (
    <FlatTableRow key='rowWithInputs' onClick={ onClickFn }>
      {firstRow}
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
      <FlatTableCell><input /></FlatTableCell>
    </FlatTableRow>
  );
}

function getTableData() {
  return processJsonData({
    labels: headRowData,
    clients: renderBody(8)
  });
}

function renderBody(rowCount) {
  const rows = [...Array(rowCount)];

  return rows.map(() => {
    return rowData;
  });
}

function processJsonData({ labels, clients }) {
  return {
    headData: {
      id: guid(),
      data: processRowData(labels, 'header')
    },
    bodyData: clients.map((row) => {
      return {
        id: guid(),
        data: processRowData(row, 'cell')
      };
    })
  };
}

function processRowData(row, cellType) {
  return Object.keys(row).map((columnKey) => {
    let align = 'left';

    if (['finalAccDue', 'corpTaxDue', 'vatDue'].includes(columnKey)) {
      align = 'right';
    }

    return {
      id: guid(),
      content: row[columnKey],
      cellType,
      align
    };
  });
}
