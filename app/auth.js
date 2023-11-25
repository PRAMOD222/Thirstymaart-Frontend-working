import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    useEffect(() => {
      const isAuthenticated = () => {
        // Get the token from local storage
        const token = localStorage.getItem('TMtoken');

        // Check if the token exists
        if (!token) {
          return false;
        }

        try {
          // Decode the token and get user information
          const decodedToken = jwt.decode(token);

          // Check if the token is valid and not expired
          if (!decodedToken || Date.now() >= decodedToken.exp * 1000) {
            return false;
          }

          // Check if the user has the required role (vendor or admin)
          if (!allowedRoles.includes(decodedToken.role)) {
            return false;
          }

          // If all checks pass, the user is authenticated
          return true;
        } catch (error) {
          console.error('Error decoding token:', error);
          return false;
        }
      };

      if (!isAuthenticated()) {
        // Redirect to login page if not authenticated or does not have the required role
        window.location.href = '/login'; // Use window.location.href for redirection
      }
    }, []);

    // Render the wrapped component if authentication and role checks pass
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
