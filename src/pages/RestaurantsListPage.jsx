import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import { AuthContext } from "../context/auth.context";
import Searchbar from "../components/Searchbar";
import { Row, Col, Card, Button } from "react-bootstrap";

function RestaurantsListPage() {
  const { user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [items, setItems] = useState(5); //quantidade inicial

  const showMoreItems = () => {
    const itemsToAdd = 5;
    setItems(items + itemsToAdd);
  };

  const getAllRestaurants = async () => {
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

      setAllRestaurants(response.data.reverse());

      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchRestaurant = (search) => {
    let searchedRestaurant = restaurants.filter((restaurant) => {
      const filteredName = restaurant.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const filteredCity = restaurant.city
        .toLowerCase()
        .includes(search.toLowerCase());
      return filteredName + filteredCity;
    });

    setAllRestaurants(searchedRestaurant);
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <main>
      <h1 className="title">Tascas</h1>
      <div className="searchBar">
        <Searchbar searchRestaurant={searchRestaurant} />
      </div>
      <div className="allRestForm">
        <Row xs={2} md={3} className="g-4">
          {restaurants &&
            allRestaurants.slice(0, items).map((restaurant) => {
              return (
                <Col>
                  <Card
                   style={{ maxWidth: "95%"}}
                    key={restaurant._id}
                    className="shadow p-2 mb-1 bg-white rounded card h-100"
                  >
                    <div className="imageSize">
                      <Card.Img
                        variant="top"
                        src={restaurant.imageUrl}
                        alt="restaurant"
                        className="photosize"
                      />
                    </div>
                    <Card.Body className="body-rest">
                      <Card.Title className="small">{restaurant.name}</Card.Title>
                      <div className="btns-admin">
                        <Link to={`/restaurants/${restaurant._id}`}>
                          <Button
                            style={{ fontSize: "0.8rem", padding:"5px", backgroundColor: "#068a9c"}}
                            
                            type="submit"
                            className="btn-admin remove-brd"
                          >
                            Details
                          </Button>
                        </Link>
                      

                      {user && user.role === "admin" && (
                        <>
                          <Link to={`/restaurants/edit/${restaurant._id}`}>
                            <Button  className="remove-brd" style={{ fontSize: "0.8rem", padding:"5px", marginLeft:"2px", backgroundColor: "#d44a1e", width:"2.4rem"}}  type="submit">
                              Edit
                            </Button>
                          </Link>
                        </>
                      )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </div>
      <Button className="remove-brd" style={{ marginTop: "10px", backgroundColor: "#d44a1e" }} onClick={showMoreItems}>
        Show More
      </Button>
    </main>
  );
}

export default RestaurantsListPage;

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
