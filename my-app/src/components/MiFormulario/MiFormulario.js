import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class MiFormulario extends Component {
  constructor(props) {
    super(props);
    this.state = { busqueda: '' };
  }

  controlarForm = (evento) => {
    evento.preventDefault();
    this.props.history.push('/resultados/' + this.state.busqueda);
  };

  controlarInput = (evento) => {
    this.setState({ busqueda: evento.target.value });
  };

  render() {
    return (
      <form onSubmit={this.controlarForm} className="search-form">
        <input
          type="text"
          placeholder="Buscar…"
          value={this.state.busqueda}
          onChange={this.controlarInput}
          name="searchData"
        />
        <button type="submit" className="btn btn-success btn-sm">Search</button>
      </form>
    );
  }
}

export default withRouter(MiFormulario);