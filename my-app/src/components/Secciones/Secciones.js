import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './styles.css';

function Secciones({ titulo, videos, toAll }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>{titulo}</h2>
        <Link to={toAll}>See all</Link> 
      </div>

      <div className="cards row">
        {videos && videos.length
          ? videos.map((item, idx) => (idx < 4 ? <Card key={item.id} data={item} /> : null))
          : <p>No hay resultados.</p>}
      </div>
    </section>
  );
}

export default Secciones;