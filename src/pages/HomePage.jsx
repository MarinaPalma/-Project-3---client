import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

function HomePage() {
  return (
    <div>
      <MyNavbar />
      <h1>Logotipo</h1>
      <h2>Find the best tascas in Portugal</h2>
      {/* <Link to="/signup"><button>Sign up</button></Link>
    <Link to="/login"><button>Login</button></Link> */}

      <h2>About TasKas</h2>
      <p>.....</p>
      <h2>Do you want to register your tasca?</h2>
      <h4>
        <b>Contact Us</b>
      </h4>
      <p>
        Give us more information about you and your business and we will contact
        you as soon as possible
      </p>
    </div>
  );
}

export default HomePage;
