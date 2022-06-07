import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function AddFavouriteBtn({ restaurantId }) {
  const { user } = useContext(AuthContext);
  const [isFavourite, setIsFavourite] = useState(false);


  const getFavoriteInfo = async () => {
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
        const favourites = response.data.favourites        

   if (favourites.some(item => item._id === restaurantId)) {
        setIsFavourite(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleClick = async () => {
    try {
      const body = { userId: user._id, restaurantId: restaurantId };

      const getToken = localStorage.getItem("authToken");

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_API_URL}/api/addfavourite`,
        body,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      console.log(response.data);
      setIsFavourite(!isFavourite)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavoriteInfo();
  }, [isFavourite]);

  return (
    <div>
      <button onClick={handleClick}>{isFavourite ? "Remove Favourite" : "Add Favourite"}</button>
    </div>
  );
}

export default AddFavouriteBtn;

{
  /* <button onClick={toggleAddFav}>{addFav ? 'Add to favourite' : 'Remove from favourite'}</button> */
}
