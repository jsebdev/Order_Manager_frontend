import React from "react";
import { Table } from "../../Table";
import { Context } from "../../../Context/AppContext";

function Orders({ title }) {
  const {
    orders,
    deleteItem,
    showSpinner,
    updateItems,
    setOrders,
    setShowEditOrderModal,
    setOrderToEdit,
  } = React.useContext(Context);

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
        id: "Options",
        Header: "Options",
        width: 200,
        Cell: ({ row }) => (
          <div className="button-cell">
            <button
              className="btn btn-primary"
              onClick={() => {
                setOrderToEdit(
                  orders.filter(
                    (order) => order.order_id === row.values.order_id
                  )[0]
                );
                setShowEditOrderModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={async () => {
                deleteItem(row.values.order_id).then(() => {
                  updateItems("orders", setOrders);
                });
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ]);
  };

  return (
    <>
      {!showSpinner ? (
        <>
          <h1 className="h1 text-center mt-5">{title}</h1>
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
            <div className="container text-center pt-4">
              No orders in the system
            </div>
          )}
        </>
      ) : (
        <div className="container text-center mt-5 fs-2">
          Orders comming ...
        </div>
      )}
    </>
  );
}

export { Orders };
