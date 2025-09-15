import React, { Component } from 'react';
import Secciones from '../../components/Secciones/Secciones';
import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masVistas: [],
      mejorValoradas: [],
      cargandoMasVistas: true,
      cargandoMejores: true
    };
  }

  componentDidMount() {
    // Más vistas (popular)
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(r => r.json())
      .then(d => { 
        this.setState({ masVistas: d.results, cargandoMasVistas: false })
        console.log(d)
  })
      .catch(() => this.setState({ masVistas: [] }));

// Mejor valoradas (top_rated)
fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
  .then(r => r.json())
  .then(d => this.setState({ mejorValoradas: d.results, cargandoMejores: false }))
  .catch(() => this.setState({ mejorValoradas: [] }));
  }

render() {
  return (
    <main className="container">
      <h1>UdeSA Movies</h1>
      {
        this.state.cargandoMasVistas ? <h1>Cargando...</h1> :
          <Secciones
            titulo="Popular movies this week"
            videos={this.state.masVistas .splice(0,4)}
            toAll="/movies?mode=popular"
          />

      }

      
    </main>
  );
}
}

export default Home;