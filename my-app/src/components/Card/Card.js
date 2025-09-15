import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      textoBoton: 'See description',
      informacionItem: props.data,
      favorito: false,
      textoFavorito: 'Agregar a favoritos'
    };
  }

  verMasVerMenos() {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === 'See description' ? 'See less' : 'See description'
    });
  }

  agregarFavorito() {
    this.setState({
      favorito: !this.state.favorito,
      textoFavorito: this.state.favorito
        ? 'Agregar a favoritos'
        : 'Sacar de favoritos'
    });
  }



  render() {
    const item = this.state.informacionItem;
    const titulo = item.title || item.name;

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

          <button
            onClick={() => this.agregarFavorito()}
            className="btn btn-warning btn-sm"
          >
            {this.state.textoFavorito}
          </button>{' '}

          <Link to={`/detalle/${item.id}`} className="btn btn-outline-primary btn-sm">
            Ver detalle
          </Link>
        </div>
      </article>
    );

  }
}

export default Card;