import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from "./screens/Home/Home";
import Movies from './screens/Movies/Movies';
import Series from './screens/Series/Series';
import MovieDetalle from './screens/MovieDetalle/MovieDetalle';
import SerieDetalle from './screens/SerieDetalle/SerieDetalle';
// import Detalle from './screens/Detalle/Detalle' --> hago uno por cada
import Favoritos from './screens/Favoritos/Favoritos';
import './css/styles.css';
import NotFound from './screens/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path='/movies' component={Movies} exact={true} />
        <Route path='/series' component={Series} exact={true} />
        <Route path='/movie/detalle/:id' component={MovieDetalle} exact={true} />
        <Route path='/serie/detalle/:id' component={SerieDetalle} exact={true} />
        <Route path='/favorites' component={Favoritos} exact={true} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>

  )
}

export default App;
