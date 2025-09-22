import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './styles.css';

function Secciones({ titulo, videos,to }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-baseline">
        <h2>{titulo}</h2>
        <Link to={to} className="vertodo">Ver todas</Link>
      </div>

      <div className="cards row">
        {videos && videos.length
          ? videos.map((item, idx) => (  <Card key={idx} data={item} />))
          : <p>No hay resultados.</p>}
      </div>
    </section>
  );
}

export default Secciones;