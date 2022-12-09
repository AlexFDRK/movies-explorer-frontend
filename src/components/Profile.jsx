import '../index.css';
import React from 'react';

import Header from '../components/Header';
import ProfileMain from '../components/ProfileMain';

const Profile = ({ handleExitClick, click, handleChangeClick, submitErrorText }) => {
  return (
    <div>
      <Header click={click} />
      <ProfileMain
        handleExitClick={handleExitClick}
        handleChangeClick={handleChangeClick}
        submitErrorText={submitErrorText}
      />
    </div>
  );
};

export default React.memo(Profile);
