import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import './css/styles.css';
import Home from "./screens/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route  path="/" component={Home} exact={true}/>
      </Switch>
      <Footer />
    </BrowserRouter>

  )
}

export default App;
