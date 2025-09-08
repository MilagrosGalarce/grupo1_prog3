import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class SeriesPopulares extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(response => response.json())
      .then(data => this.setState({ series: data.results }))
      .catch(error => console.log('El error fue: ' + error));
  }

  render() {
    return (
      <div>
        <h2 className="alert alert-warning">Popular TV shows this week</h2>

        {this.state.series.length === 0 ? (
          <h3>Cargando...</h3>
        ) : (
          <section className="row cards tv-show" id="tv-show">
            {this.state.series.map((tv, idx) =>
              idx < 4 ? (
                <article className="single-card-tv mb-3" key={tv.id}>
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sin+imagen'
                    }
                    className="card-img-top"
                    alt={tv.name}
                  />
                  <div className="cardBody">
                    <h5 className="card-title">{tv.name}</h5>
                    <p className="card-text">{tv.overview}</p>
                    <Link to={`/serie/${tv.id}`} className="btn btn-primary">
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

export default SeriesPopulares;