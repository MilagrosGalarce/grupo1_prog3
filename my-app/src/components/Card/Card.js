import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      verMas: false,
      textoBoton: 'Ver descripcion',
      informacionItem: props.data,
      textoFavorito: 'Agregar a favoritos'
    };
  }

  componentDidMount() {
    let recuperoFavoritos = localStorage.getItem('favoritos') || "[]";
    let favoritosParseados = JSON.parse(recuperoFavoritos)

    let item = this.state.informacionItem || {};

    let type = this.props.type ? this.props.type 
        : (item && item.name && !item.title 
          ? 'serie' : 'movie');

    let coincidencias = favoritosParseados.filter(favorito =>
      favorito && favorito.id === item.id && favorito.type === type
    );

    if (coincidencias.length > 0) {
        this.setState({esFavorito : true})
      }
    }

  verMasVerMenos() {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === 'Ver descripcion' ? 'Ver menos' : 'Ver descripcion'
    });
  }

  agregarFavorito(id) {
    console.log(id)
    let item = this.state.informacionItem;
    let recuperoFavoritos = localStorage.getItem('favoritos') || "[]";

    let type = this.props.type ? this.props.type 
        : (item && item.name && !item.title 
          ? 'serie' : 'movie');

    if (!recuperoFavoritos) {
      let favoritos = [{id, type}];
      let favoritosToString = JSON.stringify(favoritos);

      localStorage.setItem('favoritos', favoritosToString);
      this.setState({
        esFavorito: true
      });
    } else {
      let idFavorito = this.state.informacionItem.id;
      let typeFavorito = this.props.type;
      let favoritosParseados = JSON.parse(recuperoFavoritos);

      let coincidencias = favoritosParseados.filter(function(favorito) {
        return favorito.id === idFavorito && favorito.type === typeFavorito;
      })
  
      if (coincidencias.length === 0) {
        favoritosParseados.push({ id: id, type: type})
        let favoritosToString = JSON.stringify(favoritosParseados);
        localStorage.setItem('favoritos', favoritosToString)}

        this.setState({
          esFavorito: true
        })
     }
    }

  sacarFavorito(id) {
    let item = this.state.informacionItem;

    let type = this.props.type ? this.props.type 
        : (item && item.name && !item.title 
          ? 'serie' : 'movie');
    let recuperoFavoritos = localStorage.getItem('favoritos') || "[]";
    let favoritosParseados = JSON.parse(recuperoFavoritos);

    let filtroFavoritos =  favoritosParseados.filter(
      function (filtrado) {
        return  filtrado.id !== id || filtrado.type !== type; 
      }
    )

    let favoritosToString = JSON.stringify(filtroFavoritos);
    localStorage.setItem('favoritos', favoritosToString);

    this.setState({
        esFavorito: false
      });

    console.log(filtroFavoritos)
  }
  
  render() {
    let item = this.state.informacionItem;
    let titulo = item.title || item.name;

    let type = this.props.type || (item && item.name && !item.title ? 'serie' : 'movie');
    let verificacion = (type === 'tv' || type === 'serie')
      ? `/serie/detalle/${item.id}`
      : `/movie/detalle/${item.id}`;


    return (
      <article className="single-card-movie">
        {item.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
            alt=""
            className="card-img-top"
          />
        )}

        <div className="cardBody">
          <h5 className="card-title">{titulo}</h5>

          {this.state.verMas && item.overview && (
            <p className="card-text">{item.overview}</p>
          )}

          <button onClick={() => this.verMasVerMenos()} className="btn btn-primary btn-sm">
            {this.state.textoBoton}
          </button>{' '}

          {
            this.state.esFavorito ?  
            <button
            onClick={() => this.sacarFavorito(item.id)}
            className="btn btn-warning btn-sm"
          > Sacar
          </button> : <button
            onClick={() => this.agregarFavorito(item.id)}
            className="btn btn-warning btn-sm"
          > Agregar
          </button>

          }
          

          <Link to={verificacion} className="btn btn-outline-primary btn-sm">
            Ver detalle
          </Link>
        </div>
      </article>
    );

  }
}

export default Card;