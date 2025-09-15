import React, { Component } from 'react';
import Secciones from "../../components/Secciones/Secciones"


class Resultados extends Component {
    constructor(props) {
        super(props);
        this.state = {

            cargandoElementos: true,
            elementos: []
        };
    }

    componentDidMount() {
        console.log(this.props)
        const url = `https://api.themoviedb.org/3/search/${this.props.match.params.tipo}?api_key=f9fed29318027d1571e2d4e385ce272d&query=${this.props.match.params.busqueda}`;
        fetch(url)
            .then(r => r.json())
            .then(d => {
                this.setState({ elementos: d.results, cargandoElementos: false })
                console.log(d)
            })

    }
    render() {
        return (
            <main className="container">
                <h1>UdeSA Movies</h1>
                {
                    this.state.cargandoElementos ? <h1>Cargando...</h1> :
                        <Secciones
                            titulo="Resultados de busqueda"
                            videos={this.state.elementos}
                            toAll= {false}
                        />

                }

            </main>


        )
    }


}
export default Resultados