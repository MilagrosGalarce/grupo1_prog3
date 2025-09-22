import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import './styles.css';

class Favoritos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: '',
      loading: true
    };
  }

  componentDidMount() {
    let recuperoFavoritos = localStorage.getItem('favoritos') || "[]";
    let favoritosParseados = JSON.parse(recuperoFavoritos);

    if (!favoritosParseados || favoritosParseados.length === 0) {
      this.setState({ items: [], loading: false });
      return;
    }

    for (let i = 0; i < favoritosParseados.length; i++) {
      let favorito = favoritosParseados[i];
      let tipo = favorito.type === 'serie' ? 'tv' : favorito.type;

      fetch(`https://api.themoviedb.org/3/${tipo}/${favorito.id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
        .then(response => response.json())
        .then(data => {

          let nuevosItems = this.state.items;

          nuevosItems.push({
            id: data.id,
            title: data.title,
            name: data.name,
            poster_path: data.poster_path,
            type: favorito.type,
            overview: data.overview
          });
          this.setState({ items: nuevosItems, loading: false });
        })

        .catch(() => {
          this.setState({ loading: false, error: 'No se pudo cargar un favorito.' });
        });
    }
  }

  quitarFavoritos(id) {
    console.log(id)

    let filtrados = this.state.items.filter(item => item.id !== id)
    this.setState({ items: filtrados });
  }

 

  render() {
    const { items, loading, error } = this.state;

    if (loading) return <h2>Cargando favoritos...</h2>;
    if (error) return <p className="error">{error}</p>;
    if (items.length === 0) return <h2>No seleccionaste ningun favorito.</h2>;

    return (
      <section className="grid-cards">
        {items.map((item) => (
          <Card key={`${item.type}-${item.id}`}
            data={item}
            type={item.type}
            overview={item.overview}
            quitarFavoritos={()=>this.quitarFavoritos(item.id)}
          />
        ))}
      </section>
    );
  }

}
export default Favoritos;