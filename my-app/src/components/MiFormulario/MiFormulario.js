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
    console.log("Enviando formulario")
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
      <form onSubmit={this.controlarForm} className="">
        <input
          type="text"
          placeholder="Buscar…"
          value={this.state.busqueda}
          onChange={this.controlarInput}
          name="searchData"
          className='search'
        />
        <label>Movies</label>
        <input
          type = "radio"
          name = "tipo"
          onChange = {this.controlarRadio}
          value = "movie"
          className='search'
        />
        <label>Series</label>
        <input
          type = "radio"
          name = "tipo"
          onChange = {this.controlarRadio}
          value = "tv"
          className='search'
        />
        <button type="submit" className="boton">Search</button>
      </form>
    );
  }
}

export default withRouter(MiFormulario);