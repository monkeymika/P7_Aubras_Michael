import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

function Accueil() {

    const [listOfPosts, setListOfPosts] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);


  return (
    <div>
        {listOfPosts.map((value, key) => {
            return (
            <div className='post'> 
                <div className='title'> {value.title} </div>
                <div className='body'> {value.postText} </div>
                <div className='footer'> {value.username} </div>
            </div>
            );
        })}
    </div>
  );
}

export default Accueil