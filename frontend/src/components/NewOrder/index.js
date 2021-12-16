import React from "react";
import { Context } from "../../Context/AppContext";
import "./new_order_form.scss";

const NewOrder = () => {
  const { clients, setClients, fetchAll } = React.useContext(Context);
  const [clientType, setClientType] = React.useState("ExistingClient");

  React.useEffect(() => {
    fetchAll("users").then((res) => {
      setClients(res || []);
    });
  }, []);

  return (
    <React.Fragment>
      <h2 className="form-title">New Order</h2>
      <form className="form-style">
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
                <input type="text" name="lastname" required />
              </div>
              <div>
                <label htmlFor="govid">Gov Id:</label>
                <input type="text" name="govid" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="govid" required />
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input type="text" name="company" required />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="client">Client</label>
              <select name="client" id="client">
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name + " " + client.id}
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
          Log In
        </button>
      </form>
    </React.Fragment>
  );
};

export { NewOrder };
