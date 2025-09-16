import React, { Component } from 'react';
import Secciones from "../../components/Secciones/Secciones"
import './styles.css';

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
            .then(response => response.json())
            .then(data => {
                this.setState({ elementos: data.results, cargandoElementos: false })
                console.log(data)
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
                            toAll={false}
                        />

                }

            </main>


        )
    }


}
export default Resultados