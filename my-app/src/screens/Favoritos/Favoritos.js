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
    let recuperoFavoritos = localStorage.getItem('favoritos');

    if (recuperoFavoritos != null) {

        let favoritosParseados = JSON.parse(recuperoFavoritos);

        if (favoritosParseados.length > 0) {
            for (let i = 0; i < favoritosParseados.length; i++) {
              let favorito = favoritosParseados[i];
              const tipo = favorito.type === 'serie' ? 'tv' : favorito.type;
      
              fetch(`https://api.themoviedb.org/3/${tipo}/${favorito.id}?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES`)
                .then(response => response.json())
                .then(data => {

                    this.setState(function(prevState) {
                      let nuevosItems = [];
                      for (let i = 0; i < prevState.items.length; i++) {
                        nuevosItems.push(prevState.items[i]);
                      }
                      nuevosItems.push({
                        id: data.id,
                        title: data.title,
                        name: data.name,
                        poster_path: data.poster_path,
                        type: favorito.type
                      });
                      return { items: nuevosItems, loading: false };
                    });

                  })
                .catch(() => {
                  this.setState({ loading: false, error: 'No se pudo cargar un favorito.' });
                });
            }
          } else {
            this.setState({ items: [], loading: false });
          }}
  }

  render () {
    const { items, loading, error } = this.state;
  
    if (loading) return <h2>Cargando favoritos...</h2>;
    if (error) return <p className="error">{error}</p>;
    if (items.length === 0) return <h2>No seleccionaste ningun favorito.</h2>;
  
    return (
        <section className="grid-cards">
          {items.map((item) => {
            let titulo = item.title || item.name; 
            let poster = item.poster_path
              ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
              : 'https://via.placeholder.com/342x513?text=Sin+Imagen';

              <article key={item.id} className="single-card-movie">
                <img src={poster} alt={titulo} className="card-img-top" />
                <h5 className="card-title">{titulo}</h5>
                <Card data={item} type={item.type} />
              </article>
  })};
          </section>
      );
    }
  
  }
  export default Favoritos;