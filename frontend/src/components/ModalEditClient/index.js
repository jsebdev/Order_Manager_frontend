import React from "react";
import { Context } from "../../Context/AppContext";

export const ModalEditClient = () => {
  const { clientToEdit } = React.useContext(Context);
  const editClient = () => {
    console.log("editing Client");
  };

  return (
    <React.Fragment>
      <h2 className="form-title">Edit Client</h2>
      <form className="form-style" onSubmit={(event) => editClient(event)}>
        <div>
          <label htmlFor="id">Client Id:</label>
          <input
            className="client-id"
            defaultValue={clientToEdit.id}
            type="text"
            name="id"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={clientToEdit.name}
            type="text"
            name="name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            defaultValue={clientToEdit.lastName}
          />
        </div>
        <div>
          <label htmlFor="govid">Gov Id:</label>
          <input type="text" name="govid" defaultValue={clientToEdit.govId} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" defaultValue={clientToEdit.email} />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            name="company"
            defaultValue={clientToEdit.company}
          />
        </div>
        <button className="btn btn-primary btn-form" type="submit">
          Update Client
        </button>
      </form>
    </React.Fragment>
  );
};
