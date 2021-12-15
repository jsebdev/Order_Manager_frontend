import React from "react";
// import "./orders.scss";
import { useTable } from "react-table";

function Orders({ fetchAllOrders }) {
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    fetchAllOrders().then((res) => {
      console.log("before", res);
      // setOrders(
      //   res.map((obj) => {
      //     delete obj.shipping_info;
      //     delete obj.user_information;
      //     return obj;
      //   })
      // );
      setOrders(res);
      // setOrders([
      //   { a: "si", b: "no" },
      //   { a: "si", b: "no" },
      // ]);
    });
  }, []);

  React.useEffect(() => {
    // console.log("data is ", dataw);
    // console.log("columns is ", columnsw);
    console.log("las ordernes son", orders);
  }, [orders]);

  const datax = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columnsx = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const data = React.useMemo(() => [...orders], [orders]);
  const columns = React.useMemo(
    () =>
      orders[0]
        ? Object.keys(orders[0])
            .filter(
              (key) => key !== "shipping_info" && key !== "user_information"
            )
            .map((key) => {
              return { Header: key, accessor: key };
            })
        : [],
    [orders]
  );

  const tableInstance = useTable({ columns: columns, data: data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  React.useEffect(() => {
    console.log("rows are ", rows);
  });

  return (
    <React.Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export { Orders };
