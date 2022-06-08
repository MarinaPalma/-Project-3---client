import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MyNavbar from "../components/MyNavbar";
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap';

function EditRestaurantPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [averagePrice, setAveragePrice] = useState(5);
  const [contact, setContact] = useState(2);
  const [comments, setComments] = useState(""); // ou []? ver tb no back

  const [imageCover, setImageCover] = useState(""); //como por?

  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const getRestaurant = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      setName(response.data.name);
      setCity(response.data.city);
      setAddress(response.data.address);
      setAveragePrice(response.data.averagePrice);
      setContact(response.data.contact);
      setComments(response.data.comments);
      setImageCover(response.data.imageCover);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRestaurant = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      navigate("/restaurants");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleAveragePrice = (e) => setAveragePrice(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const handleComments = (e) => setComments(e.target.value);
  const handleImageCover = (e) => setImageCover(e.target.value);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const editRestaurant = {
        name: name,
        city: city,
        address: address,
        averagePrice: averagePrice,
        contact: contact,
        imageCover: imageCover,
      };

      const getToken = localStorage.getItem("authToken");
      await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/${restaurantId}`,
        editRestaurant,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      // Clear Inputs
      setName("");
      setCity("");
      setAddress("");
      setAveragePrice(5);
      setContact(2);
      setImageCover("");
      alert("Tasca updated");

      navigate(`/restaurants/${restaurantId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MyNavbar />
      <h1>Edit tasca</h1>

      <div >
<Form onSubmit={handleSubmit} className ="create-rest">
  <Row className="mb-1">
    <Form.Group as={Col} controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" onChange={handleName} value={name} required  placeholder="Enter name" />
    </Form.Group>
       
    <Form.Group as={Col} controlId="contact">
      <Form.Label>Contact</Form.Label>
      <Form.Control type="number" name="contact" required value={contact} placeholder="Enter number" onChange={handleContact} />
    </Form.Group>
  </Row>

        
  <Form.Group className="mb-1" controlId="address">
    <Form.Label>Address</Form.Label>
    <Form.Control name="address" onChange={handleAddress} required value={address} placeholder="1234 Rua " />
  </Form.Group>
  
  <Row className="mb-1">

  <Form.Group as={Col} controlId="city">
      <Form.Label>City</Form.Label>
      <Form.Control type="text" required value={city} placeholder="Enter city" onChange={handleCity} />
    </Form.Group>


    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Average Price</Form.Label>
      <Form.Control onChange={handleAveragePrice} required value={averagePrice} type="number" name="averagePrice" placeholder="€"/>
    </Form.Group>
  </Row>

  
  <Button variant="primary"  style={{ width: "150px", textAlign: "center", marginTop:"5px" }} type="submit">
 Edit
  </Button>


</Form>

<Button  className="btn-writecmt" style={{ width: "150px", textAlign: "center", marginTop:"5px" }} variant="danger" onClick={deleteRestaurant}> 
 Delete restaurant</Button>
</div>









      {/* <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>City</label>
        <input type="text" name="city" value={city} onChange={handleCity} />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleAddress}
        />

        <label>Average Price</label>
        <input
          type="number"
          name="averagePrice"
          value={averagePrice}
          onChange={handleAveragePrice}
        />

        <label>Contact</label>
        <input
          type="number"
          name="contact"
          value={contact}
          onChange={handleContact}
        />



        <button type="submit">Edit</button>
      </form>
      <button onClick={deleteRestaurant}>Delete</button> */}
    </div>
  );
}

export default EditRestaurantPage;
