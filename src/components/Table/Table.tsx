import React, { PropsWithChildren, useMemo, ReactElement } from 'react';
import {
  Paper,
  Table as MaterialTable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { useTable, Column } from 'react-table';

export interface IProps<T extends Record<string, unknown>> {
  data: T[];
  columns: readonly Column<object>[];
}

export const Table = <T extends Record<string, unknown>>(
  props: PropsWithChildren<IProps<T>>
): ReactElement => {
  const data = useMemo(() => props.data, [props.data]);
  const { columns } = props;
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data
  });
  return (
    <TableContainer component={Paper} data-testid="table">
      <MaterialTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.length > 0 &&
            rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};
