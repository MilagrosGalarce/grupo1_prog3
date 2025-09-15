import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import './styles.css';

class Favoritos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null,
      type: null,
      verMas: false,
      textoBoton: 'Ver mas',
      error: '',
      loading: true
    };
  }

  componentDidMount() {
    let recuperoFavoritos = localStorage.getItem('favoritos');
    if (recuperoFavoritos == null) {
        let favoritosParseados = JSON.parse(recuperoFavoritos);
         if (favoritosParseados.length > 0) {
            favoritosParseados.map(function(props){
                return
            })
            
        }
    }

  }

  render () {
    return (
        <h1> favoritos </h1>
    )
  }

}
export default Favoritos;