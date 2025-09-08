import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class PeliculasPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = { peliculas: [] };
  }

  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1'
    )
      .then((response) => response.json())
      .then((data) => this.setState({ peliculas: data.results }))
      .catch((error) => console.log('El error fue: ' + error));
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-primary">Popular movies this week</h2>

        {this.state.peliculas.length === 0 ? (
          <h3>Cargando...</h3>
        ) : (
          <section className="row cards all-movies" id="movies">
            {this.state.peliculas.map((peli, idx) =>
              idx < 4 ? (
                <article className="single-card-movie" key={peli.id}>
                  <img
                    src={
                      peli.poster_path
                        ? `https://image.tmdb.org/t/p/w500${peli.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sin+imagen'
                    }
                    className="card-img-top"
                    alt={peli.title}
                  />
                  <div className="cardBody">
                    <h5 className="card-title">{peli.title}</h5>
                    <p className="card-text">{peli.overview}</p>
                    <Link to={`/pelicula/${peli.id}`} className="btn btn-primary">
                      Ver más
                    </Link>
                    <a href="/" className="btn alert-primary">
                      
                    </a>
                  </div>
                </article>
              ) : null
            )}
          </section>
        )}
      </div>
    );
  }
}

export default PeliculasPopulares;