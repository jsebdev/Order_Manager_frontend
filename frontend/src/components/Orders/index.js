import React from "react";
import { Table } from "../Table";
import { Context } from "../../Context/AppContext";

function Orders() {
  const { setShowSpinner, updateItems, orders, deleteItem } =
    React.useContext(Context);
  React.useEffect(() => {
    updateItems("orders");
  }, []);

  React.useEffect(() => {
    if (orders[0]) {
      setShowSpinner(false);
    } else {
      setShowSpinner(true);
    }
  }, [orders]);

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

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => {
              alert("Editing: " + row.values.order_id);
            }}
          >
            Edit
          </button>
        ),
      },
      {
        id: "Delete",
        Header: "Delete",
        Cell: ({ row }) => (
          <button
            className="btn btn-danger"
            onClick={async () => {
              deleteItem(row.values.order_id).then(() => {
                updateItems("orders");
              });
            }}
          >
            Delete
          </button>
        ),
      },
    ]);
  };

  return (
    <>
      {orders[0] ? (
        <Table
          columns={columns}
          data={data}
          tableHooks={tableHooks}
          columnOrder={[
            "order_id",
            "customer_name",
            "gov_id",
            "subtotal",
            "taxes",
            "total",
          ]}
        ></Table>
      ) : (
        <div className="container text-center mt-5 fs-2">
          Orders comming ...
        </div>
      )}
    </>
  );
}

export { Orders };
