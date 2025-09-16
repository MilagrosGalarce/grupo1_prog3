import React from "react";

function Filtro(props) {
  return (
    // HAGO EL FORM
    <form className="search-form" onSubmit={(elm) => elm.preventDefault()}>
      <input
        type="text"
        placeholder="Buscar…"
        value={props.value}
        onChange={(e) => props.onFiltrar(e.target.value)}
      />
    </form>
  );
}

export default Filtro;