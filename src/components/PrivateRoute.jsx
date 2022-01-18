import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({ children, ...rest }) {
  // TODO: Use the user in context to determine whether to redirect to /auth
  const { user } = useUser();
  return (
    <Route
    {...rest}
    render={({ location }) =>
      user.email ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/auth",
            state: { from: location }
          }}
        />
      )
    }
  />
);
}