import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function CreateRestaurantPage() {

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [averagePrice, setAveragePrice] = useState(5);
  const [contact, setContact] = useState(2);


  const [imageCover, setImageCover] = useState(""); 
  
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleAveragePrice = (e) => setAveragePrice(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const handleImageCover = (e) => setImageCover(e.target.value);



  const handleSubmit = async (event) => {
    try {
        //Prevent page reloads on submit
        event.preventDefault();
    
        const newRestaurant = {
          name: name,
          city: city,
          address: address,
          averagePrice: averagePrice,
          contact: contact,
          // comments: comments, vem ou nao?
          imageCover: imageCover
        }
    
        // Make a post request to API
        const getToken = localStorage.getItem("authToken");
        let restaurant = await axios.post( `${process.env.REACT_APP_BASE_API_URL}/api/restaurants`, newRestaurant,
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
        alert("A new tasca was created")
    
        navigate("/restaurants")
      } catch (error) {
        setErrorMessage('Something went wrong. Try again')
        setTimeout(() => setErrorMessage(undefined), 2000);
      }
}


// const handleSubmit = (event) => {
  
//       //Prevent page reloads on submit
//       event.preventDefault();
  
//       const newRestaurant = {
//         name: name,
//         city: city,
//         address: address,
//         averagePrice: averagePrice,
//         contact: contact,
//         // comments: comments, vem ou nao é preciso?
//         imageCover: imageCover
//       }
  
//       // Make a post request to API
//       const getToken = localStorage.getItem("authToken");
//       axios
//       .post( `${process.env.REACT_APP_BASE_API_URL}/restaurants`, newRestaurant,
//       {
//         headers: {
//           Authorization: `Bearer ${getToken}`,
//       },
//     })
//     .then(()=>{

//       // Clear Inputs
//       setName("");
//       setCity("");
//       setAddress("");
//       setAveragePrice(5);
//       setContact(2);
//       setComments("");
//       setImageCover("");
//       alert("A new tasca was created")
  
//       navigate("/restaurants")
//     } )
//     .catch ((error) => {
//       setErrorMessage('Something went wrong. Try again')
//       setTimeout(() => setErrorMessage(undefined), 2000);
//     })
// }



  return ( 
    <div>
        <Navbar />
        <h2>Add a new Tasca</h2>
        <form onSubmit= {handleSubmit} >
            {errorMessage && <p>{errorMessage}</p>}

            <label>Name</label>
            <input type="text" name="name" value={name} onChange={ handleName } />

            <label>City</label>
            <input type="text" name="city" value={city} onChange={ handleCity } />

            <label>Address</label>
            <input type="text" name="address" value={address} onChange={ handleAddress } />

            <label>Average Price</label>
            <input type="number" name="averagePrice" value={averagePrice} onChange={ handleAveragePrice } />

            <label>Contact</label>
            <input type="number" name="contact" value={contact} onChange={ handleContact } />


{/* 
            <label></label>
            <input type="src" name="imageCover" value={imageCover} onChange={ handleImageCover } /> */}

            <button type="submit">Add</button>
        </form>
    </div>
 );


}

export default CreateRestaurantPage

