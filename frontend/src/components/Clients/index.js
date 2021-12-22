import React from "react";
import { Table } from "../Table";
import { Context } from "../../Context/AppContext";

function Clients() {
  const {
    deleteItem,
    updateItems,
    clients,
    setShowEditClientModal,
    setClientToEdit,
    setShowSpinner,
    showOrdersFromClient,
    navigate,
  } = React.useContext(Context);
  React.useEffect(() => {
    updateItems("users");
  }, []);

  React.useEffect(() => {
    if (clients[0]) {
      setShowSpinner(false);
    } else {
      setShowSpinner(true);
    }
  }, [clients]);

  const data = React.useMemo(() => [...clients], [clients]);
  const columns = React.useMemo(
    () =>
      clients[0]
        ? Object.keys(clients[0]).map((key) => {
            return { Header: key, accessor: key };
          })
        : [],
    [clients]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Options",
        Header: "Option",
        width: 300,
        Cell: ({ row }) => (
          <div className="button-cell">
            <button
              className="btn btn-primary"
              onClick={() => {
                setClientToEdit({
                  id: row.values.id,
                  name: row.values.name,
                  lastName: row.values.last_name,
                  govId: row.values.gov_id,
                  email: row.values.email,
                  company: row.values.company,
                });
                setShowEditClientModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-info"
              onClick={async () => {
                navigate("dashboard/orders/" + row.values.id);
              }}
            >
              Orders
            </button>
            <button
              className="btn btn-danger"
              onClick={async () => {
                deleteItem(row.values.id).then(() => {
                  updateItems("users");
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
      {clients[0] ? (
        <>
          <h1 className="h1 text-center mt-5">Clients</h1>
          <Table
            columns={columns}
            data={data}
            tableHooks={tableHooks}
            columnOrder={[
              "id",
              "name",
              "last_name",
              "email",
              "gov_id",
              "company",
            ]}
          ></Table>
        </>
      ) : (
        <div className="container text-center mt-5 fs-2">
          Clients comming ...
        </div>
      )}
    </>
  );
}

export { Clients };
