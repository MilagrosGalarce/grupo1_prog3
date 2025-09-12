import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Home from "./screens/Home/Home";
import Movies from './screens/Movies/Movies';
import Series from './screens/Series/Series';
import Detalle from './screens/Detalle/Detalle'

import './css/styles.css';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path='/movies' component={Movies} exact={true}/>
        <Route path='/series' component={Series} exact={true}/>
        <Route path='/detalle/:id' component={Detalle} exact={true}/>
      </Switch>

      <Footer />
    </BrowserRouter>

  )
}

export default App;
