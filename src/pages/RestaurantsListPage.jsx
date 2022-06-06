import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from "../context/auth.context";
import Searchbar from '../components/Searchbar';

function RestaurantsListPage() {
  const { user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([]);





const getAllRestaurants = async() => {
  try {
    const getToken = localStorage.getItem("authToken");
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    );
    setRestaurants(response.data);

    setAllRestaurants(response.data)
    
    // console.log(response.data);

  } catch (error) {
    console.log(error)
  }
};

useEffect(() => {
  getAllRestaurants();
}, []);



const searchRestaurant = (search) => {
  const searchedRestaurant = allRestaurants.filter((restaurant) => {
      return restaurant.name.toLowerCase().includes(search.toLowerCase());
  })

  setAllRestaurants(searchedRestaurant);
}


  return (

    <div>
     <Navbar/>
    <h1>Tascas</h1>

    <Searchbar searchRestaurant ={searchRestaurant}/>
   
    {restaurants.map((restaurant) => {
      return (
        <div key={restaurant._id}>
        <img src={restaurant.imageCover} alt="restaurant" />
        <h3>{restaurant.name}</h3>
          <Link to={`/restaurants/${restaurant._id}`}>
            <button type='submit'>See Details</button>
          </Link>
          {user && user.role ==="admin" &&(      
          <Link to={`/restaurants/edit/${restaurant._id}`}><button type="submit">Edit</button></Link>
          )}
        </div>
      );
    })}
  </div>
);
}




export default RestaurantsListPage