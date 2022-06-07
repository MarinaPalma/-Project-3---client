import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';





function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (

    <nav>


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


{/* <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand>LOGO HERE</Navbar.Brand>
    <Nav className="me-auto">

    {isLoggedIn && (
        <>
      <Nav.Link to="/restaurants">See Tascas</Nav.Link>
      <Nav.Link to="/profile">Profile</Nav.Link>
      <Nav.Link to="/">Logout</Nav.Link>

        </>
      )}



 {!isLoggedIn && (
        <>
    <Nav.Link to="/signup">Signup</Nav.Link>
      <Nav.Link to="/login">Login</Nav.Link>
              </>
      )}
    </Nav>
    </Container>
  </Navbar>  */}
