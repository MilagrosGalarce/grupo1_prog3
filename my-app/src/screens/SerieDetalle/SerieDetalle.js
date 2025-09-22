import React, { Component } from 'react';
import './styles.css';

class SerieDetalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      type: null,
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
}

  render() {
    const { item, error, loading } = this.state;

    if (loading) 
      return <div className="detalle-container"><h2>Cargando...</h2></div>;
    if (error) 
      return <div className="detalle-container"><p className="error">{error}</p></div>;
    if (!item) 
      return null;

    let titulo = item.name || 'No se ha publicado un titulo para esta serie.';
    let fecha =  item.first_air_date || 'No se ha publicado una fecha de estreno para esta serie.';
    let poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '';
    let rating = item.vote_average || 'No se han publicado ratings para esta serie.';
    let generos = (item.genres || []).map(genero => (
      <li key={genero.id}>{genero.name}</li>));
    let sinopsis = item.overview || 'Sin descripción.';

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
        <p>Sinopsis: {sinopsis}</p>
        <p>Genero/s: {generos}</p>
        </div>
     );
  }
}

export default SerieDetalle;
