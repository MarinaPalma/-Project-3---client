import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import {Carousel} from 'react-bootstrap';
import { HiOutlineMail } from "react-icons/hi";

function HomePage() {
  return (
    <div>
<div className="main-create-rest home-carrousel">
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
  <Carousel.Item interval={1000}>
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
<main>




      {/* <h2>Find the best tascas in Portugal</h2> */}
      {/* <Link to="/signup"><button>Sign up</button></Link>
    <Link to="/login"><button>Login</button></Link> */}

 
      
      <section id="about">
      <div class="about-wrapper container">
        <div class="about-text">
          <p class="small">About TasKas</p>
          <h2>We want to make people happy </h2>
          <p>
          TasKas helps people discover new places to eat good, tasty and traditional food from Portugal and  review them. You can save your favourites to remember the ones you liked the most!
          </p>
        </div>
      </div>
    </section>


    <section id="food-menu">
      <h2 className="food-menu-heading">Do you want to register your tasca?</h2>
      <div className="food-menu-container container">
        <div className="food-menu-item">
          <div className="food-img">
            <img src="https://res.cloudinary.com/dnorytyjz/image/upload/v1654782806/Taskas/Rectangle_45_whgsxn.png" alt="" />
          </div>
          <div className="food-description">
          <h2 className="food-title">Contact us <HiOutlineMail/></h2>
            <p>
            Give us more information about you and your business and we will contact
        you as soon as possible.
            </p>
            <p className="emailctc"><u>taskasadmin@gmail.com</u></p>
          </div>
        </div>
        </div>
        </section>

          <div id="footer">
      <h2>Taskas &copy; by Marina Palma - Web Dev Ironhack</h2>
    </div>
    
      </main>
    </div>
  );
}

export default HomePage;
