import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function Accueil() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);


  return (
    <div>
        {listOfPosts.map((value, key) => {
            return (
            <div key={key} className='post' onClick={() => {navigate(`/post/${value.id}`)}}> 
                <div className='title'> {value.title} </div>
                <div className='postText'> {value.postText} </div>
                <div className='footer'> {value.username} </div>
            </div>
            );
        })}
    </div>
  );
}

export default Accueil