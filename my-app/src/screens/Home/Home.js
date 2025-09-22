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
  
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(response => response.json())
      .then(data => {
        this.setState({ masVistas: data.results, cargandoMasVistas: false })
        console.log(data)
      })
      .catch(() => this.setState({ masVistas: [] }));

    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
      .then(response => response.json())
      .then(data => this.setState({ mejorValoradas: data.results, cargandoMejores: false }))
      .catch(() => this.setState({ mejorValoradas: [] }));
  }

  render() {
    return (
      <main className="container">
        <h1>UdeSA Peliculas</h1>
        {
          this.state.cargandoMasVistas ? <h1>Cargando...</h1> :
            <Secciones
              titulo="Popular movies this week"
              videos={this.state.masVistas.splice(0, 4)}
              to={'/movies'}
            />

        }

        {
          this.state.cargandoMejores ? <h1>Cargando...</h1> :
            <Secciones
              titulo="Top rated movies"
              videos={this.state.mejorValoradas.splice(0, 4)} 
                to={'/series'}/>
        }


      </main>
    );
  }
}

export default Home;