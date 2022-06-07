import React from "react";
import { useState } from "react";
import { FcSearch } from 'react-icons/fc';


function Searchbar({searchRestaurant}) {
    const [searchString, setSearchString] = useState('');

const handleSearch= (e) =>{
    setSearchString(e.target.value);
    searchRestaurant(e.target.value);

}


  return (
    <div>
        <label> <FcSearch/> Search  </label>
        <input value={searchString} placeholder="Tasca name, city" type="text" onChange={handleSearch}/>
    </div>
  )
}

export default Searchbar


// DO THIS ABOVE
// const [allRestaurants, setAllRestaurants] = useState([]);


// IN USE EFFECT ADD 
// setAllRestaurants(response.data);


   
// }    


// console.log(restaurants)
// const searchFilter = (search) => {
//     let filteredMovies = movies.filter((movie) =>
//       movie.title.toLowerCase().includes(search.toLowerCase())
//     );
//     setSearchMovies(filteredMovies);
//   };
