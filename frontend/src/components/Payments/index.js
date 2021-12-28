import React from "react";
import { Context } from "../../Context/AppContext";
import { Table } from "../Table";
import "./payments.scss";

export const Payments = () => {
  const {
    orderToEdit,
    setShowSpinner,
    ordersToFetch,
    setOrders,
    orders,
    setOrderToEdit,
    createPayment,
    updateItems,
  } = React.useContext(Context);
  const [addingPayment, setAddingPayment] = React.useState(false);
  const data = React.useMemo(() => [...orderToEdit.payments], [orderToEdit]);
  const columns = React.useMemo(
    () =>
      orderToEdit.payments[0]
        ? Object.keys(orderToEdit.payments[0]).map((key) => {
            let width = 150;
            let header = key;
            if (key === "total") {
              width = 80;
            }
            if (key === "_type") {
              header = "type";
              width = 100;
            }
            return { Header: header, accessor: key, width: width };
          })
        : [],
    [orderToEdit]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [...columns]);
  };

  const submitPayment = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    await createPayment({
      type: event.target.paymenttype.value,
      total: event.target.paymenttotal.value,
      order_id: orderToEdit.order_id,
    });
    updateItems(ordersToFetch.endpoint, setOrders);
    setAddingPayment(false);
    setShowSpinner(false);
  };
  React.useEffect(() => {
    setOrderToEdit(
      orders.filter((order) => order.order_id === orderToEdit.order_id)[0]
    );
  }, [orders]);

  return (
    <React.Fragment>
      <h2 className="form-title">Payments</h2>
      {orderToEdit.payments[0] ? (
        <div className="payments-container m-2">
          <Table columns={columns} data={data} tableHooks={tableHooks}></Table>
        </div>
      ) : (
        <p className="mx-2 text-center">There are no payments yet</p>
      )}
      {addingPayment ? (
        <form
          className="form-style"
          onSubmit={(event) => {
            submitPayment(event);
          }}
        >
          <div className="group-form">
            <div>
              <label htmlFor="paymenttype">Payment: </label>
              <select name="paymenttype" required>
                <option value="Credit Cart">Credit cart</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymenttotal">Total: </label>
              <input
                type="number"
                name="paymenttotal"
                required
                // onChange={(event) => {
                //   updatePaymentTotal(parseInt(event.target.value));
                // }}
              />
            </div>
          </div>
          <button type="submit">Add Payment</button>
        </form>
      ) : (
        <button
          className="btn btn-primary mx-auto mb-2"
          onClick={() => setAddingPayment(true)}
        >
          Add Payment
        </button>
      )}
    </React.Fragment>
  );
};
