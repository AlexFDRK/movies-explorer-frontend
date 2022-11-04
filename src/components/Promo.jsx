import '../index.css';
import React from 'react';

import BunnerHead from './BunnerHead';
import BunnerMain from './BunnerMain';
import Footer from './Footer';

const Promo = () => {
  return (
    <div className='banner'>
      <BunnerHead />
      <BunnerMain />
      <Footer />
    </div>
  );
};

export default Promo;
