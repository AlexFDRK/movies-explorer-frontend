import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../utils/token';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const token = getToken();

  return (
    <Route>
      {() =>
        !token ? (
          <Redirect to='./' />
        ) : (
          <Component {...props} />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
