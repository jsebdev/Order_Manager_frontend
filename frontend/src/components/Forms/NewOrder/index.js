import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Context/AppContext";
import "../inside_forms.scss";

const NewOrder = () => {
  const {
    setShowNewOrderModal,
    clients,
    setClients,
    createOrder,
    updateItems,
    createClient,
    setShowSpinner,
  } = React.useContext(Context);
  const [clientType, setClientType] = React.useState("ExistingClient");
  const [payments, setPayments] = React.useState([]);
  const updatePaymentType = (type, pIdx) => {
    const newPayment = [...payments];
    newPayment[pIdx].type = type;
    setPayments(newPayment);
  };
  const updatePaymentTotal = (total, pIdx) => {
    const newPayment = [...payments];
    newPayment[pIdx].total = total;
    setPayments(newPayment);
  };

  const addPayment = (event) => {
    event.preventDefault();
    setPayments([...payments, { type: "Credit Cart", total: 0 }]);
  };
  const removePayment = (event) => {
    event.preventDefault();
    const newPayment = [...payments];
    newPayment.pop();
    setPayments(newPayment);
  };

  React.useEffect(() => {
    updateItems("users", setClients);
  }, []);

  const orderSubmited = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const form = event.target;
    let subtotal = form.subtotal.value;
    let taxes = form.taxes.value;
    taxes = taxes === "" ? 0 : taxes;
    subtotal = subtotal === "" ? 0 : subtotal;
    let clientId;
    if (form.clienttype.value === "ExistingClient") {
      clientId = form.client.value;
    } else {
      const name = form.name.value;
      const lastname = form.lastname.value;
      const govid = form.govid.value;
      const email = form.email.value;
      const company = form.company.value;
      const res = await createClient({ name, lastname, govid, email, company });
      if (res.state) {
        clientId = res.client.id;
      } else {
        clientId = undefined;
      }
    }
    const res = await createOrder({
      clientId,
      subtotal,
      taxes,
    });
    if (res.state === true) {
      setShowNewOrderModal(false);
      alert("order created");
    } else {
      alert(res.msg);
    }
    setShowSpinner(false);
  };

  return (
    <React.Fragment>
      <h2 className="form-title">New Order</h2>
      <form className="form-style" onSubmit={(event) => orderSubmited(event)}>
        <div className="grid-input">
          <label htmlFor="clienttype">Order:</label>
          <select
            name="clienttype"
            id="clienttype"
            onClick={(event) => setClientType(event.target.value)}
          >
            <option value="ExistingClient">Existing Client</option>
            <option value="NewClient">New Client</option>
          </select>
        </div>
        <div className="group-form">
          {clientType === "NewClient" ? (
            <>
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" name="lastname" />
              </div>
              <div>
                <label htmlFor="govid">Gov Id:</label>
                <input type="text" name="govid" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input type="text" name="company" />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="client">Client</label>
              <select name="client" id="client">
                {clients.length > 0 &&
                  clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.id + " " + client.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        <div className="grid-input">
          <label htmlFor="subtotal">Subtotal:</label>
          <input type="number" name="subtotal" />
        </div>
        <div className="grid-input">
          <label htmlFor="taxes">Taxes:</label>
          <input type="number" name="taxes" />
        </div>
        <div className="payments-container">
          <div>
            <button
              className="btn btn-ligth payment-button"
              onClick={(event) => {
                addPayment(event);
              }}
            >
              Add Payment
            </button>
            <button
              className="btn btn-ligth payment-button"
              onClick={(event) => {
                removePayment(event);
              }}
            >
              Remove Payment
            </button>
          </div>
          {payments.map((payment) => (
            <p>
              {payment.type} {payment.total}
            </p>
          ))}
          {payments.map((payment, pIdx) => (
            <div className="group-form">
              <div>
                <label htmlFor={pIdx + "paymenttype"}>Payment: </label>
                <select
                  name={pIdx + "paymenttype"}
                  id="paymenttype"
                  onClick={(event) => {
                    updatePaymentType(event.target.value, pIdx);
                  }}
                >
                  <option value="Credit Cart">Credit cart</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label htmlFor={pIdx + "paymenttotal"}>Total: </label>
                <input
                  value={payment.total}
                  type="number"
                  name={pIdx + "paymenttotal"}
                  onChange={(event) => {
                    updatePaymentTotal(event.target.value, pIdx);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-form" type="submit">
          Create Order
        </button>
      </form>
    </React.Fragment>
  );
};

export { NewOrder };
