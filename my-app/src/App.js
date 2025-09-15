import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from "./screens/Home/Home";
import Movies from './screens/Movies/Movies';
import Series from './screens/Series/Series';
import Detalle from './screens/Detalle/Detalle'
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
        <Route path='/detalle/:id' component={Detalle} exact={true} />
        <Route path='/favorites' component={Favoritos} exact={true} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>

  )
}

export default App;
