import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import MyNavbar from "../components/MyNavbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import UpdateComment from "../components/UpdateComment";
import { AiFillHeart } from "react-icons/ai";
import {Button, Row, Col, Card} from 'react-bootstrap';


function ProfilePage() {
  const { user } = useContext(AuthContext);

  //   const { commentId } = useParams();

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const [showComments, setShowComments] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const toggleShow = () => {
    setShowComments(!showComments);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const getUser = async () => {
    try {
      const getToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/profile/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );

      setCurrentUser(response.data);

      if (response.data.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      setErrorMessage(error.response);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <>
      <MyNavbar />
      <div>
        {user && (
          <>
            <h1 style={{marginTop: "30px"}}>Welcome {user.name}!</h1>

            <img src={user.imageProfile} alt="profile" width="100px" />
            {/* <h3>{user.name}</h3> */}
            <p>{user.email}</p>
          </>
        )}

        {user && user.role === "user" && (
          <>
            <h3 style={{marginTop: "30px"}}>
              {" "}
              <AiFillHeart /> Favourite Tascas{" "}
            </h3>


    <div className="">
        <Row xs={2} md={3} className="g-4 favouritesForm">
          {currentUser &&
            currentUser.favourites.map((restaurant) => {
              return (
                <Col className="favouritesForm">
                  <Card style={{ maxWidth: "90%" }} key={restaurant._id} className="shadow p-1 mb-1 bg-white rounded card h-100">
                        <div className="imageSize">
                            <Card.Img variant="top" src={restaurant.imageUrl} alt="restaurant" className="photosize"/>
                        </div>
                        <Card.Body className="body-rest">
                        <Card.Title as={Link} to={`/restaurants/${restaurant._id}`} style={{color:"black", textDecoration: "none"}}><b>{restaurant.name}</b></Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
              );
        })}
        </Row>
    </div>
        







            {/* {currentUser &&
              currentUser.favourites.map((restaurant) => {
                return (
                  <div key={restaurant._id}>
                    <img
                      src={restaurant.imageUrl}
                      alt="restaurant"
                      width="150px"
                    />
                    <Link to={`/restaurants/${restaurant._id}`}>
                      {" "}
                      <h3>{restaurant.name}</h3>
                    </Link>
                    <h3>{restaurant.name}</h3>
                  </div>
                );
              })} */}

            {currentUser && !currentUser.favourites.length && (
              <p style={{marginTop: "30px"}}>
                No favourites yet! Go and adventure yourself in the tasty world
                of tascas
              </p>
            )}
          </>
        )}

        {user && user.role === "admin" && (
            <div >
          <>
            <Link to="/restaurants/add">
              <Button type="submit" style={{backgroundColor: "#068a9c", outline:"none"}}>Add new Tasca</Button>
            </Link>
            <Link to="/restaurants">
              <Button style={{marginLeft: "5px", backgroundColor: "#068a9c",  outline:"none"}} type="submit" >Manage Tascas</Button>
            </Link>
          </>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;

// <h3>Reviews</h3>
//     <button onClick={toggleShow}>{showComments ? 'Hide' : 'Show'}</button>

// {showComments && currentUser &&

//   currentUser.comments.map((comment) => {
//     return (
//       <div key={comment._id}>
//         <p>{comment.restaurant}</p>
//         <p>{comment.content}</p>
//         <button onClick= {toggleEdit}>Edit comment</button>
//         {showEdit && <UpdateComment/>}
//         {/* <button onClick={deleteComment}>Delete comment</button> */}
//       </div>
//     );
//   })}

//   {currentUser && !currentUser.comments.length && <p>No reviews yet! Help other by commenting the tascas you went to </p>
//   }
