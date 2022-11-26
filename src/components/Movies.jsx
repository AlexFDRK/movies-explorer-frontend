import '../index.css';
import React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const Movies = ({
  click,
  makeTurnClick,
  localMovies,
  savedMoviesId,
  handleFilmSubmit,
  showPreloader,
  likeMovieClick,
}) => {
  return (
    <section className='movies'>
      <Header click={click} />
      <Body
        makeTurnClick={makeTurnClick}
        localMovies={localMovies}
        savedMoviesId={savedMoviesId}
        showPreloader={showPreloader}
        handleFilmSubmit={handleFilmSubmit}
        likeMovieClick={likeMovieClick}
      />
      <Footer />
    </section>
  );
};

export default React.memo(Movies);
