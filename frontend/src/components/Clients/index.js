import React from "react";
import { Table } from "../Table";
import { Context } from "../../Context/AppContext";

function Clients() {
  const { navigate, clients, setClients, fetchAll, logout } =
    React.useContext(Context);
  React.useEffect(() => {
    fetchAll("users").then((res) => {
      console.log(res);
      if (res.status !== 200) {
        alert("no es 200", res.status);
        // logout();
        // navigate("/login");
      }
      setClients(res.res || []);
    });
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
        id: "Edit",
        Header: "Edit",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary"
            onClick={() => {
              alert("Editing: " + row.values.id);
            }}
          >
            Edit
          </button>
        ),
      },
    ]);
  };

  return (
    <>
      {clients[0] ? (
        <Table columns={columns} data={data} tableHooks={tableHooks}></Table>
      ) : (
        <div className="container text-center mt-5 fs-2">
          Clients comming ...
        </div>
      )}
    </>
  );
}

export { Clients };
