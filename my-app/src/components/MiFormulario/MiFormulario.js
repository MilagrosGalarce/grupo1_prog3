import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class MiFormulario extends Component {
  constructor(props) {
    super(props);
    this.state = { busqueda: '' , tipo: '' };

  }

  controlarForm = (evento) => {
    evento.preventDefault();
    this.props.history.push('/resultados/' + this.state.busqueda + "/" + this.state.tipo);
  };

  controlarInput = (evento) => {
    this.setState({ busqueda: evento.target.value });
  };

   controlarRadio = (evento) => {
    this.setState({ tipo: evento.target.value });
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
        <label>Movies</label>
        <input
          type = "radio"
          name = "tipo"
          onChange = {this.controlarRadio}
          value = "movie"
        
        />
        <label>Series</label>
        <input
          type = "radio"
          name = "tipo"
          onChange = {this.controlarRadio}
          value = "tv"
        />
        <button type="submit" className="btn btn-success btn-sm">Search</button>
      </form>
    );
  }
}

export default withRouter(MiFormulario);