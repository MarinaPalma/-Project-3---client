import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddComment from "../components/AddComment";
import UpdateComment from "../components/UpdateComment";
import AddFavouriteBtn from "../components/AddFavouriteBtn";
import { AuthContext } from "../context/auth.context";
import MyNavbar from "../components/MyNavbar";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineEuro } from "react-icons/ai";

function RestaurantDetailsPage() {
  const [restaurant, setRestaurant] = useState(null);
  const [comments, setComments] = useState([]);
  const { restaurantId } = useParams();
  const { user } = useContext(AuthContext);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // const [addFav, setAddFav] = useState(false);

  // const toggleEdit = () =>{

  //   setShowEdit(!showEdit)
  //   }

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

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
      //console.log(response.data)
      setRestaurant(response.data);
      setComments(response.data.comments.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurant();
  }, []);

  const deleteComment = async (id) => {
    try {
      const getToken = localStorage.getItem("authToken");
      await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      getRestaurant();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {user && user.role === "user" && (
        <AddFavouriteBtn restaurantId={restaurantId} />
      )}

      <h1 className="title">Tasca details</h1>
      <div className="detailsCard">
        <Card
          style={{ maxWidth: "90%" }}
          className="shadow p-2 mt-2 mb-1 bg-white rounded card h-100"
        >
          <Row className="g-0">
            {restaurant && (
              <>
                <Col md="4">
                  <Card.Img src={restaurant.imageUrl} alt="..." fluid />
                </Col>
                <Col md="8">
                  <Card.Body className="body-details-card">
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>{restaurant.city}</Card.Text>
                    <Card.Text>
                    <FiMapPin /> {restaurant.address}
                    </Card.Text>
                    <Card.Text>
                      <FaPhoneAlt /> {restaurant.contact}
                    </Card.Text>
                    <Card.Text>
                      <AiOutlineEuro /> Average price: {restaurant.averagePrice}
                      €
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">Have you been here? </small>
                    </Card.Text>
                  </Card.Body>
                </Col>
                {user && user.role === "user" && (
                  <>
                    <Button
                      className="btn-writecmt remove-brd"
                      style={{ width: "150px", textAlign: "center", backgroundColor: "#068a9c", marginTop: "5px" }}
                      
                      onClick={toggleAdd}
                    >
                      {showAdd ? "Hide form" : "Write a review"}
                    </Button>
                    {showAdd && (
                      <AddComment
                        refreshRestaurant={getRestaurant}
                        restaurantId={restaurantId}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </Row>
        </Card>
      </div>

      {/* <h1>Tasca details</h1> */}
      {/* {user && user.role ==="user" &&(
    <AddFavouriteBtn restaurantId={restaurantId}/>
    )} */}

      {/* {restaurant && (
        <> */}
          {/* <h2>{restaurant.name}</h2>
  <img src={restaurant.imageUrl} alt="" />
  <p>{restaurant.city}</p>
  <p>{restaurant.address}</p>
  <p>{restaurant.contact}</p>
  <p>{restaurant.averagePrice}€</p> */}
{/* 
          {user && user.role === "user" && (
            <>
              <button onClick={toggleAdd}>
                {showAdd ? "Hide form" : "Write a review"}
              </button>
              {showAdd && (
                <AddComment
                  refreshRestaurant={getRestaurant}
                  restaurantId={restaurantId}
                />
              )}
            </>
          )}
        </>
      )} */}

      
   <h1 className="title-reviews">Reviews</h1>   
<div className="reviews-main">

      {restaurant &&
          comments.map((comment) => {
            return (


      <Card style={{ width: "90%" }} className="card mb-1 bg-light  rounded reviews-body " key={comment._id}>
      {comment.author && (
                  
  <Card.Body className="reviews-body">
  <div >
    <Card.Title>{comment.author.name}</Card.Title>
    <Card.Subtitle className="mb-1 text-muted">{comment.createdAt.slice(0, 10)}</Card.Subtitle>
  
    <Card.Text>
    {comment.content}
    </Card.Text>
  </div>
  <div >
               {comment.imageUrl.length > 0 ? (
                      <>
                        {comment.imageUrl.map((img) => {
                          return (
                            <img className="comment-image"
                              key={img}
                              src={img}
                              alt="review"
                              width="100px"
                            />
                          );
                          })}{" "}
                      </>
                    ) : (
                      ""
                    )}
                    </div>
                    {comment.author._id === user._id && (
                      <>
                      <Button variant ="danger"
                      className="btn-writecmt remove-brd"
                      style={{ width: "150px", textAlign: "center", marginTop:"5px"}}
                      
                      onClick={() => deleteComment(comment._id)}
                    >  Delete comment</Button>
                      </>
                    )}         
  </Card.Body>
  )}
</Card>
            );
          })}
          {restaurant && !comments.length && (
              <p>
                No reviews yet! Go and be the first one!
              </p>
            )}

 </div>

      <Link to="/restaurants">
        <Button className="remove-brd" style={{ marginTop: "10px", backgroundColor: "#068a9c"}} >See all Tascas</Button>
      </Link>
</main>
  );
}

export default RestaurantDetailsPage;





{/* <h1>Reviews</h1> */ }
{/* {restaurant &&
          comments.map((comment) => {
            return (
              <div key={comment._id}>
                {comment.author && (
                  <>
                    <h3>{comment.author.name}</h3>
                    <p>{comment.createdAt.slice(0, 10)}</p>
                    <h5>Review:</h5>
                    <p> {comment.content}</p>

                    {comment.imageUrl.length > 0 ? (
                      <>
                        {comment.imageUrl.map((img) => {
                          return (
                            <img
                              key={img}
                              src={img}
                              alt="review"
                              width="200px"
                            />
                          );
                          })}{" "}
                      </>
                    ) : (
                      ""
                    )}

                    {comment.author._id === user._id && (
                      <>
                        <button onClick={() => deleteComment(comment._id)}>
                          Delete comment
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
      </div>

      <Link to="/restaurants">
        <button>See all Tascas</button>
      </Link>
    </div>
  );
}

export default RestaurantDetailsPage; */}


