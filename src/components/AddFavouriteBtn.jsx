import React, {useContext, useState} from 'react'
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

function AddFavouriteBtn({restaurantId}) {
    const { user } = useContext(AuthContext);
    const [addFav, setAddFav] = useState(false);

    const toggleaddFav = () =>{
   
        setAddFav(!addFav)
        }


    const handleClick = async () => {

        try {
            const body ={userId: user._id, restaurantId: restaurantId}

          const getToken = localStorage.getItem("authToken");
          console.log(getToken)
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_API_URL}/api/addfavourite`, body,
            {
              headers: {
                Authorization: `Bearer ${getToken}`,
              },
            }
          );
          console.log(response.data)
          
          
      
        } catch (error) {
          console.log(error)
        }
      
        
      };

  return (
    <div>
    
    <button onClick = {handleClick}>Add to favourite</button>
    </div>
  )
}

export default AddFavouriteBtn

