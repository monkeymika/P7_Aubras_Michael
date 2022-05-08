import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function ProfilePage() {

    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect (() => {
        axios.get(`http://localhost:4000/auth/info/${id}`)
        .then((res) => {
            setUsername(res.data.username)
        })

        axios.get(`http://localhost:4000/posts/byuserid/${id}`)
        .then((res) => {
            setListOfPosts(res.data)
        })
    }, []);

    
  return (
    <div className='profilePageContainer'>
        <div className='info'> <h1> Nom utilisateur : {username}</h1></div>
        <div className='listOfPosts'>

        {listOfPosts.map((value, key) => {
        return (
          <div key={key} className='post' > 
            <div className='title'> {value.title} </div>
            <div className='postText' onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText} </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
               
                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  )
}

export default ProfilePage