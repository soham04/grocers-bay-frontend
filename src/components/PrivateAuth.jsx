import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../utils/firebase.utils';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = !!auth.currentUser;

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/signup" replace />}
        />
    );
};

export default PrivateRoute;
