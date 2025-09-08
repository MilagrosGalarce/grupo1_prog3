import React from 'react';
import PeliculasPopulares from '../../components/PeliculasPopulares/PeliculasPopulares';
import PeliculasEnCartel from '../../components/PeliculasEnCartel/PeliculasEnCartel';
import SeriesPopulares from '../../components/SeriesPopulares/SeriesPopulares';
import SeriesHoy from '../../components/SeriesHoy/SeriesHoy';

function Home() {
  return (
    <main>
      <h1>Udesa Movies</h1>
      <PeliculasPopulares />
      <PeliculasEnCartel />
      <SeriesPopulares />
      <SeriesHoy />
    </main>
  );
}

export default Home;