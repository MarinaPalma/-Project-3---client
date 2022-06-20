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

    <div className="form-group search-input">
<label for="search"><FcSearch/> Search</label>
<input  style={{width:"12rem", marginLeft:"5px"}} className="form-control" id="search" value={searchString} placeholder="Tasca name, city" type="text" onChange={handleSearch}/>
</div>
  )
}

export default Searchbar


