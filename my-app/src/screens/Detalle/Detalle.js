import React, { Component } from 'react';
import './styles.css';

class Detalle extends Component {
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
     this.cargar(); 
    }

  componentDidUpdate(prevProps) {
      let id = this.props.match.params.id;
      if (prevProps.match.params.id != id) 
        this.cargar();
    }
  
    cargar () {
      let id = this.props.match.params.id;

      this.setState({
        item: null,
        type: null,
        verMas: false,
        error: '',
        loading: true
      });

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
      .then(response => response.json())
      .then(data => this.setState(
        { item: data,
          type: 'movie',
          loading: false }))
      .catch(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
        .then(response => response.json())
        .then(data => this.setState(
        { item: data,
          type: 'serie',
          loading: false }))
        .catch(() => this.setState(
          { loading: false,
           error: 'No se pudo cargar el detalle.' }
          ));
  })
}

toggleVerMas() {
  this.setState((prevState) => ({
    verMas: !prevState.verMas,
    textoBoton: prevState.textoBoton === "Ver más" ? "Ver menos" : "Ver más"
  }));
}

  render() {
    const { item, type, verMas, textoBoton, error, loading } = this.state;

    if (loading) 
      return <div className="detalle-container"><h2>Cargando...</h2></div>;
    if (error) 
      return <div className="detalle-container"><p className="error">{error}</p></div>;
    if (!item) 
      return null;

    let titulo = type === 'movie' ? item.title : item.name;
    let fecha = type === 'movie' ? item.release_date : item.first_air_date || 'No se ha publicado una fecha de estreno.';
    let poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    let rating = item.vote_average || 'No se han publicado ratings.';
    let generos = (item.genres || []).map(genero => 
      (<li> {genero.name} </li>) || 'No se ha encontrado un genero.');
    let sinopsis = item.overview || 'Sin descripción.';

    let duracion = null;
    if (type === 'movie' && item.runtime != null) {
      duracion = `${item.runtime} minutos`;
    } else if (type === 'tv' && item.episode_run_time && item.episode_run_time.length > 0) {
      duracion = `${item.episode_run_time[0]} min (por episodio)`;
    }    

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
        <p>Duración:{duracion}</p>
        <p>Sinopsis:{sinopsis}</p>
        <p>Genero/s:{generos}</p>
        </div>
     );
  }
}

export default Detalle;
