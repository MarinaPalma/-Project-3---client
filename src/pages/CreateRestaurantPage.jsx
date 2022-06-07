import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function CreateRestaurantPage() {

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [averagePrice, setAveragePrice] = useState("");
  const [contact, setContact] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 

  const [isUploading, setIsUploading] = useState(false)
  
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleAveragePrice = (e) => setAveragePrice(e.target.value);
  const handleContact = (e) => setContact(e.target.value);
  const handleImageUrl = (e) => setImageUrl(e.target.value);



  const handleFileUpload = async (e) => {

    try{
      const uploadData = new FormData();
   
      uploadData.append("imageUrl", e.target.files[0]);
      
      const getToken = localStorage.getItem("authToken");
  
      setIsUploading(true)
  
      const response = await axios.post( `${process.env.REACT_APP_BASE_API_URL}/api/upload`, uploadData,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
      );
  
      setImageUrl(response.data.fileUrl);
      setIsUploading(false)
  
    }    catch (error) {
      console.log(error)
          }
  
      }




  const handleSubmit = async (event) => {
    try {
        //Prevent page reloads on submit
        event.preventDefault();

        if(isUploading) return
    
        const newRestaurant = {
          name: name,
          city: city,
          address: address,
          averagePrice: averagePrice,
          contact: contact,
          imageUrl: imageUrl
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
        setAveragePrice("");
        setContact("");
        setImageUrl("");
        alert("A new tasca was created")
    
        navigate("/restaurants")
      } catch (error) {
        setErrorMessage('Something went wrong. Try again')
        setTimeout(() => setErrorMessage(undefined), 2000);
      }
}





  return ( 
    <div>
        <Navbar />
        <h2>Add a new Tasca</h2>
        <form onSubmit= {handleSubmit} >
            {errorMessage && <p>{errorMessage}</p>}



            <label></label>
          <input type="file" required onChange={(e) => handleFileUpload(e)} />


            <label>Name</label>
            <input type="text" name="name" value={name} required onChange={ handleName } />

            <label>City</label>
            <input type="text" name="city" value={city} required onChange={ handleCity } />

            <label>Address</label>
            <input type="text" name="address" value={address} required onChange={ handleAddress } />

            <label>Average Price</label>
            <input type="number" name="averagePrice" value={averagePrice} required onChange={ handleAveragePrice } />

            <label>Contact</label>
            <input type="number" name="contact" value={contact} required onChange={ handleContact } />


            <button type="submit">{isUploading ? "Uploading Photo" : "Add"}</button>

            {/* <button type="submit">Add</button> */}
        </form>
    </div>
 );


}

export default CreateRestaurantPage

