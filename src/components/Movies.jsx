import '../index.css';
import React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const Movies = ({
  click,
  itSavedFilms,
  localMovies,
  savedMoviesId,
  filterText,
  moviesIsShort,
  handleFilmSubmit,
  showPreloader,
  likeMovieClick,
  connectError,
}) => {
  return (
    <section className='movies'>
      <Header click={click} />
      <Body
        itSavedFilms={itSavedFilms}
        localMovies={localMovies}
        savedMoviesId={savedMoviesId}
        filterAppText={filterText}
        moviesIsShort={moviesIsShort}
        handleFilmSubmit={handleFilmSubmit}
        showPreloader={showPreloader}
        likeMovieClick={likeMovieClick}
        connectError={connectError}
      />
      <Footer />
    </section>
  );
};

export default React.memo(Movies);
