import React from "react";
import { Context } from "../../../Context/AppContext";
import "../inside_forms.scss";

const NewOrder = () => {
  const {
    setShowNewOrderModal,
    clients,
    setClients,
    createOrder,
    updateItems,
    setShowSpinner,
    createPayment,
    createShipping,
  } = React.useContext(Context);
  const [clientType, setClientType] = React.useState("ExistingClient");
  const [payments, setPayments] = React.useState([]);
  const [shipping, setShipping] = React.useState(false);
  const [prices, setPrices] = React.useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    payment: 0,
  });

  React.useEffect(() => {
    const newPrices = { ...prices };
    newPrices.payment = payments.reduce(
      (total, payment) => total + payment.total,
      0
    );
    setPrices(newPrices);
  }, [payments]);

  const updatePrices = (value, price) => {
    const newPrices = { ...prices };
    newPrices[price] = isNaN(value) ? 0 : value;
    setPrices(newPrices);
  };
  const updatePaymentType = (type, pIdx) => {
    const newPayment = [...payments];
    newPayment[pIdx].type = type;
    setPayments(newPayment);
  };
  const updatePaymentTotal = (total, pIdx) => {
    const newPayment = [...payments];
    newPayment[pIdx].total = isNaN(total) ? 0 : total;
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
    let client;
    if (form.clienttype.value === "ExistingClient") {
      clientId = form.client.value;
      client = false;
    } else {
      const name = form.name.value;
      const lastname = form.lastname.value;
      const govid = form.govid.value;
      const email = form.email.value;
      const company = form.company.value;
      client = { name, lastname, govid, email, company };
      clientId = false;
    }
    const res = await createOrder({
      clientId,
      subtotal,
      taxes,
      client,
    });
    let orderId;
    if (res.state === true) {
      orderId = res.order.id;
    } else {
      alert(res.msg);
    }
    payments.forEach((payment) => {
      createPayment({
        type: payment.type,
        total: payment.total,
        order_id: orderId,
      });
    });
    if (shipping) {
      createShipping({
        order_id: orderId,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        country: form.country.value,
        cost: form.cost.value === "" ? 0 : form.cost.value,
        delivered: form.delivered.checked,
      });
    }
    setShowNewOrderModal(false);
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
              <select name="client" id="client" required>
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
          <label htmlFor="subtotal">Subtotal: $</label>
          <input
            type="number"
            name="subtotal"
            onChange={(event) =>
              updatePrices(parseInt(event.target.value), "subtotal")
            }
          />
        </div>
        <div className="grid-input">
          <label htmlFor="taxes">Taxes: $</label>
          <input
            type="number"
            name="taxes"
            onChange={(event) =>
              updatePrices(parseInt(event.target.value), "taxes")
            }
          />
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
          {payments.map((payment, pIdx) => (
            <div key={"payment" + pIdx} className="group-form">
              <div>
                <label htmlFor={pIdx + "paymenttype"}>
                  Payment {pIdx + 1}:{" "}
                </label>
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
                  type="number"
                  name={pIdx + "paymenttotal"}
                  onChange={(event) => {
                    updatePaymentTotal(parseInt(event.target.value), pIdx);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="grid-input">
          <label htmlFor="enableshipping">Ship ?</label>
          <input
            className="w-auto"
            type="checkbox"
            name="enableshipping"
            onChange={(event) => {
              setShipping(event.target.checked);
            }}
          />
        </div>
        {shipping && (
          <div className="group-form">
            <div>
              <label htmlFor="address">Address:</label>
              <input type="text" name="address" />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input type="text" name="city" />
            </div>
            <div>
              <label htmlFor="State">State:</label>
              <input type="text" name="state" />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <input type="text" name="country" />
            </div>
            <div>
              <label htmlFor="cost">Cost: $</label>
              <input
                type="number"
                name="cost"
                onChange={(event) =>
                  updatePrices(parseInt(event.target.value), "shipping")
                }
              />
            </div>
            <div>
              <label htmlFor="delivered">Deliver:</label>
              {prices.subtotal +
                prices.taxes +
                prices.shipping -
                prices.payment >
              0 ? (
                <input
                  className="w-auto"
                  type="checkbox"
                  name="delivered"
                  checked={false}
                  readOnly
                  disabled
                />
              ) : (
                <input className="w-auto" type="checkbox" name="delivered" />
              )}
            </div>
          </div>
        )}
        <button className="btn btn-primary btn-form" type="submit">
          Create Order
        </button>
      </form>
    </React.Fragment>
  );
};

export { NewOrder };
