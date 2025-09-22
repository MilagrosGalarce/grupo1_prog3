import React, { Component } from 'react';
import './styles.css';

class MovieDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      type: null,
      verMas: false,
      textoBoton: 'Ver mas',
      error: '',
      loading: true,
      idActual: null
    };
  }

  componentDidMount() {
     this.cargar(); 
    }

    componentDidUpdate() {
      let id = this.props.match.params.id;
      if (id !== this.state.idActual) {
        this.cargar();
      }
    }    
  
    cargar () {
      let id = this.props.match.params.id;

      this.setState({
        error: '',
        loading: true,
        idActual: id
      });

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
      .then(response => response.json())
      .then(data => this.setState(
        { item: data,
          type: 'movie',
          loading: false, 
           }))
      .catch(() => this.setState(
        { loading: false,
         error: 'No se pudo cargar el detalle de esta pelicula.' }
        ));
  }

toggleVerMas() {
  let nuevoVerMas = !this.state.verMas;
  let nuevoTextoBoton = this.state.textoBoton  === "Ver más" ? "Ver menos" : "Ver más";

  this.setState({
    verMas: nuevoVerMas,
    textoBoton: nuevoTextoBoton
  });
}

  render() {
    const { item, error, loading } = this.state;

    if (loading) 
      return <div className="detalle-container"><h2>Cargando...</h2></div>;
    if (error) 
      return <div className="detalle-container"><p className="error">{error}</p></div>;
    if (!item) 
      return null;

    let titulo = item.title || 'No se ha publicado un titulo para esta pelicula';
    let fecha = item.release_date || 'No se ha publicado una fecha de estreno para esta pelicula.';
    let poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    let rating = item.vote_average || 'No se han publicado ratings para esta pelicula.';
    let generos = (item.genres || []).map(genero => (
      <li key={genero.id}>{genero.name}</li>));
    let sinopsis = item.overview || 'Sin descripción.';
    let duracion = `${item.runtime} minutos` || 'No se ha publicado la duracion de esta pelicula.';

    return (
      <div className="detalle-container">
        <h1>{titulo}</h1>
        {poster && 
        (<img src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
            alt=""
            className="card-img-top"
          />)}
        <p>Calificación: {rating}</p>
        <p>Fecha de estreno: {fecha}</p>
        <p>Duración: {duracion}</p>
        <p>Sinopsis: {sinopsis}</p>
        <p>Genero/s: {generos}</p>
        </div>
     );
  }
}

export default MovieDetalle;
