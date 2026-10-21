import { Navigate } from 'react-router';

function ProtectedRoute({ user, children }) {
  return (
    <>
      <style>
        {`
          /* ProtectedRoute styling */
          div {
            font-family: Arial, sans-serif;
          }
        `}
      </style>

      {!user ? (
        <Navigate to="/login" />
      ) : (
        children
      )}
    </>
  );
}

export default ProtectedRoute;