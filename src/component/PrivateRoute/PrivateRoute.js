import React, { useContext  } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const token = sessionStorage.getItem('token')
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
               (loggedIn.email || token)  ? (
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