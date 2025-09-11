import React, { Component } from 'react'
import Card from '../../components/Card/Card'

class Series extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [],
            pedidoInicialCompleto: false,
            paginaALlamar: 1,
        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/tv/airing_today?api_key=f9fed29318027d1571e2d4e385ce272d&language=en-US&page=1')
            .then(resp => resp.json())
            .then(data => {
                console.log('data fetch', data)
                this.setState({
                    series: data.results,
                    pedidoInicialCompleto: true,
                    paginaALlamar: this.state.paginaALlamar + 1,

                })
            })
            .catch((error) => console.log('error fetch', error))
    }

    cargarMas() { 
        fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=f9fed29318027d1571e2d4e385ce272d&language=en-US&page=${this.state.paginaALlamar}`)
            .then(resp => resp.json())
            .then(data =>
                this.setState({
                    series: this.state.series.concat(data.results || []),
                    paginaALlamar: this.state.paginaALlamar + 1
                }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <h1>Series</h1>
                {this.state.pedidoInicialCompleto ? (
                    <>
                        <div className="cards row">
                            {this.state.series.length
                                ? this.state.series.map((item) => (
                                    <Card key={item.id} data={item} />
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

export default Series;