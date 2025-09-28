import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function AdminProjectRoute({ children }) {


  const { isAuthenticated, isLoading, isAdmin } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isAdmin ) {
    return <Navigate to="/" state={{ from: location }} replace />;

  }

  return children
}

export default AdminProjectRoute
