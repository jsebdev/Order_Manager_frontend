import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AppContext";
import "./new_order_form.scss";

const NewOrder = () => {
  const { clients, createOrder, updateItems, createClient } =
    React.useContext(Context);
  const [clientType, setClientType] = React.useState("ExistingClient");
  const navigate = useNavigate();

  React.useEffect(() => {
    updateItems("users");
  }, []);

  const orderSubmited = async (event) => {
    event.preventDefault();
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
      alert("order created");
    } else {
      alert(res.msg);
    }
  };

  return (
    <React.Fragment>
      <h2 className="form-title">New Order</h2>
      <form className="form-style" onSubmit={(event) => orderSubmited(event)}>
        <div>
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
        <div className="groupform">
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
              please
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
        <div>
          <label htmlFor="subtotal">Subtotal:</label>
          <input type="number" name="subtotal" />
        </div>
        <div>
          <label htmlFor="taxes">Taxes:</label>
          <input type="number" name="taxes" />
        </div>
        <button className="btn btn-primary btn-form" type="submit">
          Create Order
        </button>
      </form>
    </React.Fragment>
  );
};

export { NewOrder };
