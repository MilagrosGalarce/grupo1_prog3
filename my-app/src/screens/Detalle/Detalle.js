/*import React, { Component } from 'react';
import './styles.css';

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      type: props.location?.state?.type || null,
      verMas: false,
      textoBoton: 'Ver más',
      error: '',
      loading: true
    };
  }

  componentDidMount() {
    const {type}  = this.state; // TENGO QUE CORREGIR ESTO PARA PODER ACCEDER A CADA UNO DE LOS DETALLES
    const id = this.props.match.params.id;

    if (!type) {
      this.setState({ loading: false, error: 'Falta el tipo (movie/tv) en el link.' });
      return;
    }

    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
      .then(r => r.json())
      .then(data => this.setState({ item: data, loading: false }))
      .catch(() => this.setState({ loading: false, error: 'No se pudo cargar el detalle.' }));
  }

  toggleVerMas() {
    this.setState(prev => ({
      verMas: !prev.verMas,
      textoBoton: prev.textoBoton === 'Ver más' ? 'Ver menos' : 'Ver más'
    }));
  }

  render() {
    const { item, type, verMas, textoBoton, error, loading } = this.state;

    if (loading) return <div className="detalle-container"><h2>Cargando...</h2></div>;
    if (error) return <div className="detalle-container"><p className="error">{error}</p></div>;
    if (!item) return null;

    const titulo = type == 'movie' ? item.title : item.name;
    const fecha = type == 'movie' ? item.release_date : item.first_air_date;
    const poster = item.poster_path ? `'https://image.tmdb.org/t/p/w500'${item.poster_path}` : '';
    const rating = item.vote_average != null ? item.vote_average :
    const generos = 
    const sinopsis = item.overview || 'sin descripción.';

    let duracion = null;
    if (type === 'movie' && item.runtime != null) {
      duracion = this.item.runtime;
    } else if (type === 'tv' && item.episode_run_time != null) {
      duracion = this.item.episode_run_time + 'por episodio'; // corregir esto
    }

    return (
      <div className="detalle-container">
        <h1>{titulo}</h1>

        falta imagen

        <p>Calificación: {rating}</p>
        <p>Fecha de estreno: {this.fecha(fecha)}</p>
        <p>Duración:{duracion}</p>
        <p>Sinopsis:{sinopsis}</p>
        <p>Genero:{generos}</p>
        


        <button onClick={() => this.toggleVerMas()} className="btn">
          {textoBoton}
        </button>
      </div>
    );
  }
}

export default Detalle;*/
