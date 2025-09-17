import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esFavorito: false,
      verMas: false,
      textoBoton: 'See description',
      informacionItem: props.data,
      textoFavorito: 'Agregar a favoritos'
    };

  }Fsingl
  componentDidMount() {
    let recuperoFavoritos = localStorage.getItem('favoritos');
    let favoritosParseados = JSON.parse(recuperoFavoritos);

    let coincidencias = favoritosParseados.filter(function(favorito) {
      return favorito.id == this.state.informacionItem.id && favorito.type == this.state.type;
    })


    if (favoritosParseados) {
      if (favoritosParseados.includes(this.state.informacionItem.id)) {
        this.setState({esFavorito : true})
      }
    }

   }

  verMasVerMenos() {
    this.setState({
      verMas: !this.state.verMas,
      textoBoton: this.state.textoBoton === 'See description' ? 'See less' : 'See description'
    });
  }


  agregarFavorito(id) {

    console.log(id)
    let recuperoFavoritos = localStorage.getItem('favoritos');
    if (recuperoFavoritos == null) {
      let favoritos = [id];
      let favoritosToString = JSON.stringify(favoritos);
      localStorage.setItem('favoritos', favoritosToString);
      this.setState({
        esFavorito: true
      });
    } else {
      let favoritosParseados = JSON.parse(recuperoFavoritos);
      favoritosParseados.push(id)
      let favoritosToString = JSON.stringify(favoritosParseados);
      localStorage.setItem('favoritos', favoritosToString);
      this.setState({
        esFavorito: true
      });
    }
    

  };

  sacarFavorito(id) {
    let recuperoFavoritos = localStorage.getItem('favoritos');
    let favoritosParseados = JSON.parse(recuperoFavoritos);

    let filtroFavoritos =  favoritosParseados.filter(
      function (filtrado) {
        return  filtrado !== id
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
    const item = this.state.informacionItem;
    const titulo = item.title || item.name;
    let verificacion = this.props.type == 'serie' ? `/serie/detalle/${item.id}` : `/movie/detalle/${item.id}`;

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