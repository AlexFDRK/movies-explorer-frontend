import '../index.css';
import React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const Movies = ({ movies, click, makeTurnClick }) => {
  return (
    <section className='movies'>
      <Header click={click} />
      <Body movies={movies} makeTurnClick={makeTurnClick} />
      <Footer />
    </section>
  );
};

export default Movies;
