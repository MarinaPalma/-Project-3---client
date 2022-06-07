import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useParams, useNavigate} from 'react-router-dom';
import UpdateComment from "../components/UpdateComment";
import {AiFillHeart} from "react-icons/ai"



function ProfilePage() {
  const { user } = useContext(AuthContext);


//   const { commentId } = useParams();

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

const [showComments, setShowComments] = useState(false)
const [showEdit, setShowEdit] = useState(false)



const toggleShow = () =>{
setShowComments(!showComments)
}

const toggleEdit = () =>{
   
    setShowEdit(!showEdit)
    }





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
      <Navbar/>
    <div>
      {user && (
        <>
    <h1>Hello {user.name}!</h1>

          <img src={user.imageProfile} alt="profile" width='200px'/>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </>
      )}

{user && user.role ==="user" &&(
  <>
    <h3> <AiFillHeart/> Favourite Tascas </h3>


  {currentUser &&
      currentUser.favourites.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <img src={restaurant.imageUrl} alt="restaurant" width="400px"/>
            <Link to={`/restaurants/${restaurant._id}`}> <h3>{restaurant.name}</h3></Link>
            <h3>{restaurant.name}</h3>
          </div>
        );
      })}

  {currentUser && !currentUser.favourites.length && <p>No favourites yet! Go and adventure yourself in the tasty world of tascas</p>
      }




      </>
      )}

      {user && user.role ==="admin" &&(
          <>
          <Link to="/restaurants/add"><button type="submit">Add a new Tasca</button></Link>
          <Link to="/restaurants"><button type="submit">Manage Tascas</button></Link>
          </>
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



