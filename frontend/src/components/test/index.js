import React, { useState } from "react";
import "./sss.scss";
export function DropDown() {
  const [selected, setSelected] = useState("");
  const [expanded, setExpanded] = useState(false);

  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }

  function select(event) {
    const value = "el valor";
    close();
    setSelected(value);
  }

  return (
    <div className="dropdown mio" tabIndex={0} onFocus={expand} onBlur={close}>
      hola
      <div>{selected}</div>
      {expanded ? (
        <div className={"mio"}>
          <div className={"mio"} onClick={select}>
            Contenido
          </div>
        </div>
      ) : null}
    </div>
  );
}
