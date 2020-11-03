import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const user = JSON.parse(sessionStorage.getItem('user'))
    useEffect(()=>{
        if(loggedIn.emil === ''){
          const user = JSON.parse(sessionStorage.getItem('user'))
          setLoggedIn({
            name: user.name,
            email: user.email,
            photo: user.photo
          })
          console.log(user.email)
        }
      }, [])
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