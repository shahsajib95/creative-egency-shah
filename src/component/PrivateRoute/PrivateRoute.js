import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                loggedIn.email || user.email ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                }
            />
        </div>
    );
};

export default PrivateRoute;