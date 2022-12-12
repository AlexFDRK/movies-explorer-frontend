import '../index.css';
import React from 'react';

import Header from '../components/Header';
import ProfileMain from '../components/ProfileMain';

const Profile = ({ handleExitClick, click, handleChangeClick, submitErrorText, setSubmitErrorText }) => {
  return (
    <div>
      <Header click={click} />
      <ProfileMain
        handleExitClick={handleExitClick}
        handleChangeClick={handleChangeClick}
        submitErrorText={submitErrorText}
        setSubmitErrorText={setSubmitErrorText}
      />
    </div>
  );
};

export default React.memo(Profile);
