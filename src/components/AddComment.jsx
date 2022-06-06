import { useState } from "react";
import axios from "axios";

function AddComment(props) {
const[content, setContent] = useState("")
const [imageUrl, setImageUrl] = useState("")

const handleContent = (e) => setContent(e.target.value);
const handleImageUrl = (e) => setImageUrl(e.target.value);



const handleSubmit = async (event) => {
    try {    
    event.preventDefault();
 
    const { restaurantId } = props;

        // Create an object representing the body of the POST request
    const body = { content, imageUrl, restaurant: restaurantId}; //restaurantId??nao o pus no backend!!
    
    const getToken = localStorage.getItem("authToken");

    await axios.post( `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/comments`, body,
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
    );
    setContent("");
    setImageUrl("");
    props.refreshRestaurant();
}
    catch (error) {
        console.log(error)
            }
 }


  return (
    <div>
    <h1>Add a review</h1>

    <form onSubmit={handleSubmit}>
        <label>Content</label>
        <textarea
           name="content"
          cols="30"
          rows="10"
          value={content}
          onChange={ handleContent } 
        ></textarea>
 
        {/* <label>Add photo</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleImageUrl}
        /> */}
 
        <button type="submit">Add</button>
      </form>
    
    
    </div>
  )
}

export default AddComment




 

