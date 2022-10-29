import { useRef } from 'react';

import '../index.css';
import Bunner from './Banner';
import About from './About';
import Tech from './Tech';
import Student from './Student';
import Footer from './Footer';
import React from 'react';

const Promo = () => {
  const aboutBlock = useRef(null);
  const techBlock = useRef(null);
  const studentBlock = useRef(null);

  function handleClick(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className='banner'>
      <Bunner
        aboutBlock={aboutBlock}
        techBlock={techBlock}
        studentBlock={studentBlock}
        handleClick={handleClick}
      />
      <About aboutBlock={aboutBlock} />
      <Tech techBlock={techBlock} />
      <Student studentBlock={studentBlock} />
      <Footer />
    </section>
  );
};

export default Promo;
