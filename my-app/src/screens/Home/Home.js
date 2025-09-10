import React, { Component } from 'react';
import Secciones from '../../components/Secciones/Secciones';
import './styles.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      masVistas: [],
      mejorValoradas: []
    };
  }

  componentDidMount(){
    // Más vistas (popular)
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(r => r.json())
      .then(d => this.setState({ masVistas: d.results || [] }))
      .catch(() => this.setState({ masVistas: [] }));

    // Mejor valoradas (top_rated)
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(r => r.json())
      .then(d => this.setState({ mejorValoradas: d.results || [] }))
      .catch(() => this.setState({ mejorValoradas: [] }));
  }

  render(){
    return (
      <main className="container">
        <h1>UdeSA Movies</h1>

        <Secciones
          titulo="Popular movies this week"
          videos={this.state.masVistas}
          toAll="/movies?mode=popular"
        />

        <Secciones
          titulo="Top rated movies"
          videos={this.state.mejorValoradas}
          toAll="/movies?mode=top_rated"
        />
      </main>
    );
  }
}

export default Home;