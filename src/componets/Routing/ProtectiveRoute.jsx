import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProtectiveRoute({ children }) {

    const { isAuthenticated, isLoading ,isAdmin } = useSelector((state) => state.auth);
    let location = useLocation();

     // While Redux is checking auth state, we can show a loader
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    
    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to. This allows us to send them along to that page after they login,
        // which is a nicer user experience.
        
          return  <Navigate to="/login" state={{ from: location }} replace />;
    }
     
    // if(!isAdmin){
    //     return <Navigate to="/"  replace />;
    // }

    return children
}

export default ProtectiveRoute
