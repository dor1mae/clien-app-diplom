import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../providers/AuthProvider';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuthContext()

  return (
    <Component {...rest}/>
  )
};

export default ProtectedRoute;