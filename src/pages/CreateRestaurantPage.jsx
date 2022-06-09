import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import {Form, Button, Row, Col, InputGroup} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateRestaurantPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [contact, setContact] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleAveragePrice = (e) => setAveragePrice(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);

  const handleFileUpload = async (e) => {
    try {
      const uploadData = new FormData();

      uploadData.append("imageUrl", e.target.files[0]);

      const getToken = localStorage.getItem("authToken");

      setIsUploading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/upload`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      setImageUrl(response.data.fileUrl);
      setIsUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    try {
      //Prevent page reloads on submit
      event.preventDefault();

      if (isUploading) return;

      const newRestaurant = {
        name: name,
        city: city,
        address: address,
        averagePrice: averagePrice,
        contact: contact,
        imageUrl: imageUrl,
      };

      // Make a post request to API
      const getToken = localStorage.getItem("authToken");
      let restaurant = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/restaurants`,
        newRestaurant,
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
      setAveragePrice("");
      setContact("");
      setImageUrl("");
      toast.success('A new tasca was created!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // alert("A new tasca was created");

      navigate("/restaurants");
    } catch (error) {
      setErrorMessage("Something went wrong. Try again");
      setTimeout(() => setErrorMessage(undefined), 2000);
    }
  };

  return (
    <div>
      <MyNavbar />
      <h2>Add a new Tasca</h2>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<div className="main-create-rest">
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

  <Form.Group controlId="formFileSm" className="mb-3">
    <Form.Label >Add photo </Form.Label>
    <Form.Control type="file" size="sm" required onChange={(e) => handleFileUpload(e)}/>
  </Form.Group>
  
  <Button style={{ backgroundColor: "#068a9c"}} type="submit">
    {isUploading ? "Uploading Photo" : "Add"}
  </Button>


</Form>

</div>


{/* 
    <div>
      <MyNavbar />
      <h2>Add a new Tasca</h2> */}
      {/* <form onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}

      

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={handleName}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={handleCity}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          required
          onChange={handleAddress}
        />

        <label>Average Price</label>
        <input
          type="number"
          name="averagePrice"
          value={averagePrice}
          required
          onChange={handleAveragePrice}
        />

        <label>Contact</label>
        <input
          type="number"
          name="contact"
          value={contact}
          required
          onChange={handleContact}
        />

<label></label>
        <input type="file" required onChange={(e) => handleFileUpload(e)} />

        <button type="submit">{isUploading ? "Uploading Photo" : "Add"}</button> */}

        {/* <button type="submit">Add</button> */}
      {/* </form> */}
    </div>
  );
}

export default CreateRestaurantPage;
