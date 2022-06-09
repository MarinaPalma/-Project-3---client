import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import {Carousel} from 'react-bootstrap';

function HomePage() {
  return (
    <div>
      <MyNavbar />
      <h1>  </h1>

<div className="main-create-rest">
      <Carousel className="carrosel-ph">
  <Carousel.Item interval={1000}>
    <img
      className="d-block w-100 "
      src="https://res.cloudinary.com/dnorytyjz/image/upload/v1654724634/Taskas/Rectangle_4_1_zj0mvv.png"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Find the best tascas in Portugal</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/dnorytyjz/image/upload/v1654724634/Taskas/1024_720.jpg_ncw834.png"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Find the best tascas in Portugal</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/dnorytyjz/image/upload/v1654724634/Taskas/Rectangle_1_2_nkl2ip.png"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Find the best tascas in Portugal</h3>

    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/dnorytyjz/image/upload/v1654724634/Taskas/Rectangle_40_rjtswi.png"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Find the best tascas in Portugal</h3>

    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</div>



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
