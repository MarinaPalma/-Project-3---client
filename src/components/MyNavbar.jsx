import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Nav, Navbar } from "react-bootstrap";

function MyNavbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar style={{backgroundColor: "#d44a1e"}} variant="light">
      <Navbar.Brand as={Link} to={"/"}><img src={"https://res.cloudinary.com/dnorytyjz/image/upload/v1654732249/Taskas/Sem_t%C3%ADtulo-removebg-preview_x3lg0j.png"} style={{marginLeft:"10px"}} width="35px" alt="logo"/></Navbar.Brand>
      <Nav className="justify-content-end">
        {isLoggedIn && (
          <>
              <Nav.Link  as={Link} to={"/restaurants"} > See tascas </Nav.Link>
            <Nav.Link as={Link} to={"/profile"}> Profile </Nav.Link>
            <Nav.Link as={Link} to={"/"} onClick={logoutUser} > Logout </Nav.Link>
          </>
        )}

        {!isLoggedIn && (
          <>
          <Nav.Link as={Link} to={"/signup"}> Signup </Nav.Link>
          <Nav.Link as={Link} to={"/login"}> Login </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>


  );
}

export default MyNavbar;
