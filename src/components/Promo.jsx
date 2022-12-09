import '../index.css';
import React from 'react';

import Header from './Header';
import BunnerHead from './BunnerHead';
import BunnerMain from './BunnerMain';
import Footer from './Footer';

const Promo = ({ loggedIn, click }) => {
  return (
    <div className='banner'>
      {loggedIn ? <Header click={click} dark={true} /> : <BunnerHead />}
      <BunnerMain />
      <Footer />
    </div>
  );
};

export default Promo;
