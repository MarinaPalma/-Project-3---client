import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      {/* <Link to="/">
        <button>Home</button>
      </Link> */}

      {isLoggedIn && (
        <>
          <Link to="/restaurants">
            <button>See Tascas</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <Link to="/">
          <button onClick={logoutUser}>Logout</button>
          </Link>

        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
