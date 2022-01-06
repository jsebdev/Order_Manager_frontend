import React from "react";
import { Context } from "../../../Context/AppContext";

/**
 * Update Client form
 * @returns Form to update clients info
 */
export const ModalEditClient = () => {
  const {
    generateURL,
    clientToEdit,
    editItem,
    setShowSpinner,
    updateItems,
    setClients,
  } = React.useContext(Context);
  const [msg, setMsg] = React.useState(null);

  return (
    <React.Fragment>
      <h2 className="form-title">Edit Client</h2>
      <form
        className="form-style"
        onSubmit={async (event) => {
          event.preventDefault();
          setMsg(null);
          setShowSpinner(true);
          const res = await editItem(
            {
              client_id: event.target.id.value,
              name: event.target.name.value,
              last_name: event.target.lastname.value,
              gov_id: event.target.govid.value,
              email: event.target.email.value,
              company: event.target.company.value,
            },
            "updateclient"
          );
          setMsg(res.msg);
          updateItems(generateURL("users"), setClients);
          setShowSpinner(false);
        }}
      >
        <div className="grid-input">
          <label htmlFor="id">Client Id:</label>
          <input
            className="client-id"
            defaultValue={clientToEdit.id}
            type="text"
            name="id"
            readOnly
          />
        </div>
        <div className="grid-input">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={clientToEdit.name}
            type="text"
            name="name"
            required
          />
        </div>
        <div className="grid-input">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            defaultValue={clientToEdit.lastName}
          />
        </div>
        <div className="grid-input">
          <label htmlFor="govid">Gov Id:</label>
          <input type="text" name="govid" defaultValue={clientToEdit.govId} />
        </div>
        <div className="grid-input">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={clientToEdit.email} />
        </div>
        <div className="grid-input">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            defaultValue={clientToEdit.company}
          />
        </div>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        <button className="btn btn-primary btn-form" type="submit">
          Update Client
        </button>
      </form>
    </React.Fragment>
  );
};
