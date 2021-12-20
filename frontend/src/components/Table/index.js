import React, { useContext } from "react";
import {
  useTable,
  useSortBy,
  useColumnOrder,
  useAbsoluteLayout,
  useBlockLayout,
  useFlexLayout,
} from "react-table";

function Table({ columns, data, tableHooks, columnOrder }) {
  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        columnOrder: columnOrder,
      },
    },
    tableHooks,
    useSortBy,
    useColumnOrder,
    // useAbsoluteLayout
    // useBlockLayout
    useFlexLayout
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <React.Fragment>
      <div className="table-container">
        <table className="orderTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export { Table };
