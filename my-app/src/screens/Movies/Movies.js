import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import MiFormulario from '../../components/MiFormulario/MiFormulario'

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculas: [],
            pedidoInicialCompleto: false,
            paginaALlamar: 1,
        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
            .then(resp => resp.json())
            .then(data => {
                console.log('data fetch', data)
                this.setState({
                    peliculas: data.results,
                    pedidoInicialCompleto: true,
                    paginaALlamar: this.state.paginaALlamar + 1,

                })
            })
            .catch((error) => console.log('error fetch', error))
    }

    cargarMas() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=${this.state.paginaALlamar}`)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results || []),
                    paginaALlamar: this.state.paginaALlamar + 1
                }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1>Películas</h1>
                <form  className="search-form">
                    <input
                        type="text"
                        placeholder="Buscar…"
                        value={this.state.busqueda}
                        onChange={this.controlarInput}
                        name="searchData"
                    />
                </form>
                {this.state.pedidoInicialCompleto ? (
                    <>
                        <div className="cards row">
                            {this.state.peliculas.length
                                ? this.state.peliculas.map((item) => (
                                    <Card key={item.id} data={item} type="movie"/>
                                ))
                                : <p>No hay resultados.</p>}
                        </div>
                        <button onClick={() => this.cargarMas()}>Cargar más</button>
                    </>
                ) : (
                    <h2>CARGANDO...</h2>
                )}
            </div>
        )
    }
}

export default Movies;