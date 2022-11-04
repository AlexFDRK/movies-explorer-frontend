import '../index.css';
import React from 'react';

import Header from '../components/Header';
import ProfileMain from '../components/ProfileMain';

const Profile = ({ click }) => {
  return (
    <div>
      <Header click={click} />
      <ProfileMain />
    </div>
  );
};

export default Profile;
