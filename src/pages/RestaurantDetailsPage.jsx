import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AddComment from '../components/AddComment';
import UpdateComment from '../components/UpdateComment';
import AddFavouriteBtn from '../components/AddFavouriteBtn';
import { AuthContext } from "../context/auth.context";
import Navbar from '../components/Navbar';

function RestaurantDetailsPage() {

const [restaurant, setRestaurant] = useState(null)
const [comments, setComments] = useState([])
const {restaurantId} = useParams();
const { user } = useContext(AuthContext);
const [showEdit, setShowEdit] = useState(false)
const [showAdd, setShowAdd] = useState(false)
// const [addFav, setAddFav] = useState(false);

// const toggleEdit = () =>{
   
//   setShowEdit(!showEdit)
//   }

  const toggleAdd = () =>{
   
    setShowAdd(!showAdd)
    }

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
    setComments(response.data.comments.reverse())

  } catch (error) {
    console.log(error)
  }

  
};

useEffect(() => {
  getRestaurant();
}, []);



const deleteComment = async (id) =>{
  try {
      const getToken = localStorage.getItem("authToken");
       await axios.delete( `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
     getRestaurant();
    } catch (error) {
      console.log(error);
    } 
};

  return (
    
    <div>
    <Navbar/>
    <h1>Tasca details</h1>
    {user && user.role ==="user" &&(
    <AddFavouriteBtn restaurantId={restaurantId}/>
    )}


  {restaurant && (
<>
  <h2>{restaurant.name}</h2>
  <img src={restaurant.imageUrl} alt="" />
  <p>{restaurant.city}</p>
  <p>{restaurant.address}</p>
  <p>{restaurant.contact}</p>
  <p>{restaurant.averagePrice}€</p>

  {/* <Link to="???"><button>Write a review</button></Link> */}
{user && user.role ==="user" &&(
  <>
  <button onClick= {toggleAdd}>{showAdd ? 'Hide form' : 'Write a review'}</button>
            {showAdd &&  <AddComment refreshRestaurant={getRestaurant} restaurantId={restaurantId} /> }

</>
 )}           
  {/* <AddComment refreshRestaurant={getRestaurant} restaurantId={restaurantId} />  */}



</>
    )}

    <div >
    <h1>Reviews</h1>
 {restaurant && (
   comments.map((comment)=> {
     return (
      <div key={comment._id}>
        {comment.author && (
        <>
            <h3>{comment.author.name}</h3>
            <p>{comment.createdAt.slice(0,10)}</p>
            <h5>Review:</h5>
            <p> {comment.content}</p>

            {comment.imageUrl.length > 0 ? (<>
          {comment.imageUrl.map((img) => {
            return <img key={img} src={img} alt="review" width='200px'/>
          })}         </>) : ("")}

            {comment.author._id === user._id &&
              <>
                <button onClick={() => deleteComment(comment._id)}>Delete   comment</button>
              </>
            }
      </>)}
      </div>
     )
   })
 )}   

</div>

 <Link to="/restaurants">
        <button>See all Tascas</button>
      </Link>
    
    </div>
  )
}

export default RestaurantDetailsPage


// {comment.imageUrl.length > 0 ? (
//   <>
//          {comment.imageUrl.map((img) => {
//            return <img src={img} alt="review" width='200px'/>
//          })}
//          </>
// ) : ""
        
//          }