import '../index.css';
import React from 'react';

import Bunner from './Banner';
import About from './About';
import Tech from './Tech';
import Student from './Student';

import { useRef } from 'react';

const BunnerMain = () => {
  const aboutBlock = useRef(null);
  const techBlock = useRef(null);
  const studentBlock = useRef(null);

  function handleClick(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
      <Bunner
        aboutBlock={aboutBlock}
        techBlock={techBlock}
        studentBlock={studentBlock}
        handleClick={handleClick}
      />
      <About aboutBlock={aboutBlock} />
      <Tech techBlock={techBlock} />
      <Student studentBlock={studentBlock} />
    </main>
  );
};

export default BunnerMain;
