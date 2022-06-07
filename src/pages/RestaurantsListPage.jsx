import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AuthContext } from "../context/auth.context";
import Searchbar from '../components/Searchbar';
import {Row, Col, Card, Button} from 'react-bootstrap';



function RestaurantsListPage() {
  const { user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [items, setItems] = useState(5) //quantidade inicial


const showMoreItems = () => {
  const itemsToAdd = 5
  setItems(items + itemsToAdd)
}

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


const searchRestaurant = (search) => {
  let searchedRestaurant = restaurants.filter((restaurant) => {
    const filteredName = restaurant.name.toLowerCase().includes(search.toLowerCase())
    const filteredCity = restaurant.city.toLowerCase().includes(search.toLowerCase())
      return filteredName + filteredCity;
  })

  setAllRestaurants(searchedRestaurant);
}


useEffect(() => {
  getAllRestaurants();
}, []);






  return (

    <div>
     <Navbar/>
    <h1>Tascas</h1>
<div className="searchBar">
    <Searchbar searchRestaurant ={searchRestaurant}/>
</div>
    <div className="allRestForm">
    <Row xs={2} md={3} className="g-4" >
    {restaurants && allRestaurants.slice(0,items).map((restaurant) => {

return (
    <Col >
      <Card key={restaurant._id} className="shadow p-2 mb-1 bg-white rounded card h-100">
      <div className="imageSize">
        <Card.Img variant="top" src={restaurant.imageUrl} alt="restaurant" className="photosize"/>
        </div>
        <Card.Body className="body-rest">
          <Card.Title style={{fontSize: "0.9rem"}}>{restaurant.name}</Card.Title>
          
          {/* <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text> */}
          <div>
          <Link to={`/restaurants/${restaurant._id}`}>
          <Button style={{fontSize: "0.75rem"}} variant="primary" type='submit'>See Details</Button>
          </Link>
          </div>

          {user && user.role ==="admin" &&( 
            <>    
          <Link to={`/restaurants/edit/${restaurant._id}`}>
          <Button variant="danger" type='submit' >Edit</Button>
          </Link>
          </> 
          )}
        </Card.Body>
      </Card>
    </Col>
  )})}

</Row>
</div>
  <Button variant="outline-primary" onClick={showMoreItems}>Show More</Button>

  </div>
);
}




export default RestaurantsListPage



// {restaurants && allRestaurants.slice(0,items).map((restaurant) => {

//   return (
//     <div key={restaurant._id}>
//     <img src={restaurant.imageUrl} alt="restaurant" width="400px"/>
//     <h3>{restaurant.name}</h3>
//       <Link to={`/restaurants/${restaurant._id}`}>
//         <button type='submit'>See Details</button>
//       </Link>
//       {user && user.role ==="admin" &&(      
//       <Link to={`/restaurants/edit/${restaurant._id}`}><button type="submit">Edit</button></Link>
      
//       )}
//     </div>
//   );
// })}
// <button onClick={showMoreItems}>Show More</button>