import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import Filtro from '../../components/Filtro/Filtro'

class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peliculas: [],
            backup: [],
            busqueda: '',
            pedidoInicialCompleto: false,
            paginaALlamar: 1,
        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=1')
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    peliculas: data.results,
                    backup: data.results,
                    pedidoInicialCompleto: true,
                    paginaALlamar: this.state.paginaALlamar + 1,

                })
            })
            .catch((error) => console.log('error fetch', error))
    }

    cargarMas = () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=f9fed29318027d1571e2d4e385ce272d&language=es-ES&page=${this.state.paginaALlamar}`)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    peliculas: this.state.peliculas.concat(data.results || []),
                    paginaALlamar: this.state.paginaALlamar + 1
                }))
            .catch(error => console.log(error))
    }

    filtro = (texto) => {
        // necesito saber que voy a filtrar, eso llega desde el parametro. 
        // a esa data que me llega la paso a lower case y la comparo contra la data que tengo. Para eso puedo usar el metodo .filter()
        // con el metodo filter busco con this.state.PROPIEDAD QUE TIENE EL ARRAY PERSONAJES.filter()
        // al filter le paso un callback que se encargue de hacer la busqueda que buscara en todo el array
        // le paso un valor y le indiico elm => me quiero quedar unicamente con los que el titulo o el nombre que tengo en el array que tengan el valor recuperado del parametro
        // para eso hago (elm) => elm.title.toLowerCase().includes(texto.toLowerCase())
        // ahora necesito actualizar el estado para renderizar las tarjetas. this.setState({personajes.filtrado})
        // quien tendria que ejecutar este metodo? el filtro. entonces si este metodo FILTRO esta declarado en la screen como llega al componente? 
        const filtrado = this.state.backup.filter((elm) =>
            (elm.title || '').toLowerCase().includes((texto || '').toLowerCase())
        )
        this.setState({ busqueda: texto, peliculas: filtrado })
    }

    render() {
        return (
            <div>
                <h1 class='titulo'>Películas</h1>
                <Filtro value={this.state.busqueda} onFiltrar={this.filtro} class='filtro'/>
                {this.state.pedidoInicialCompleto ? (
                    <>
                        <div className="cards row">
                            {this.state.peliculas.length
                                ? this.state.peliculas.map((item) => (
                                    <Card key={item.id} data={item} type="movie" />
                                ))
                                : <p>No hay resultados.</p>}
                        </div>
                        {this.state.busqueda === '' && (
                            <button onClick={this.cargarMas} class='cargarMas'>Cargar más</button>
                        )}
                    </>
                ) : (
                    <h2>CARGANDO...</h2>
                )}
            </div>
        )
    }
}

export default Movies;