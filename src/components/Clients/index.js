import React from "react";
import { Table } from "../Table";
import { Context } from "../../Context/AppContext";

/**
 * Clients Component
 * @returns Returns table with all the clients
 */
function Clients() {
  const {
    deleteItem,
    updateItems,
    clients,
    setClients,
    setShowEditClientModal,
    generateURL,
    setClientToEdit,
    showSpinner,
    navigate,
    setOrdersToFetch,
  } = React.useContext(Context);
  React.useEffect(() => {
    updateItems(generateURL("users"), setClients);
  }, []);

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
                setOrdersToFetch({
                  title: row.values.name + "'s Orders",
                });
                navigate("dashboard/orders/" + row.values.id);
              }}
            >
              Orders
            </button>
            <button
              className="btn btn-danger"
              onClick={async () => {
                deleteItem(row.values.id).then(() => {
                  updateItems(generateURL("users"), setClients);
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
          <h1 className="h1 text-center mt-5">All Clients</h1>
          {clients[0] ? (
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
          ) : (
            <div className="container text-center pt-4">
              No Clients in the system
            </div>
          )}
        </>
      ) : (
        <div className="container text-center mt-5 fs-2">
          Clients coming ...
        </div>
      )}
    </>
  );
}

export { Clients };
