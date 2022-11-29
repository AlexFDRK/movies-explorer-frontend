import '../index.css';
import React from 'react';

import Header from '../components/Header';
import ProfileMain from '../components/ProfileMain';

const Profile = ({ handleExitClick, click }) => {
  return (
    <div>
      <Header click={click} />
      <ProfileMain handleExitClick={handleExitClick} />
    </div>
  );
};

export default Profile;
