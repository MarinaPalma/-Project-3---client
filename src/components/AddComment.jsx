import { useState } from "react";
import axios from "axios";

function AddComment(props) {
const[content, setContent] = useState("")
const [imageUrl, setImageUrl] = useState("")
const [isUploading, setIsUploading] = useState(false)

const handleContent = (e) => setContent(e.target.value);
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
    event.preventDefault();
    if(isUploading) return
 
    const { restaurantId } = props;

  // Create an object representing the body of the POST request
    let body 

    if(imageUrl === "") {
      body = { content, restaurant: restaurantId}; 
    } else {
      body = { content, imageUrl, restaurant: restaurantId}; 
    }
      
    const getToken = localStorage.getItem("authToken");

    const createdCommment = await axios.post( `${process.env.REACT_APP_BASE_API_URL}/api/restaurants/comments`, body,
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



        <label>Review</label>
        <textarea
           name="content"
          cols="30"
          rows="10"
          value={content}
          required
          onChange={ handleContent } 
        ></textarea>
 
 <input type="file" onChange={(e) => handleFileUpload(e)} />
 
        <button type="submit">{isUploading ? "Uploading Photo" : "Add"}</button>
      </form>
    
    
    </div>
  )
}

export default AddComment




 

