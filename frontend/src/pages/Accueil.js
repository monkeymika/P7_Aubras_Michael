import React, {useContext} from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {AuthContext} from "../helpers/AuthContext";

function Accueil() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    //si la personne n'est pas inscrite, retour à login
    if (!localStorage.getItem("accessToken")) {
      navigate('/login');
    } else {

      axios.get("http://localhost:4000/posts", 
      { headers: { accessToken: localStorage.getItem("accessToken") }})
      .then((res) => {
        setListOfPosts(res.data.listOfPosts);
        setLikedPosts(
          res.data.likedPosts.map((like) => {
            return like.PostId
          })
        );
      });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
    .post(
      "http://localhost:4000/likes",
      { PostId: postId },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
    .then((response) => {
      setListOfPosts(
        listOfPosts.map((post) => {
          if (post.id === postId) {
            if (response.data.liked) {
              return { ...post, Likes: [...post.Likes, 0] };
            } else {
              const likesArray = post.Likes;
              likesArray.pop();
              return { ...post, Likes: likesArray };
            }
          } else {
            return post;
          }
        })
      );

      if (likedPosts.includes(postId)) {
        setLikedPosts(
          likedPosts.filter((id) => {
            return id !== postId;
          })
        );
      } else {
        setLikedPosts([...likedPosts, postId]);
      }
    });
  };

  
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className='post' > 
            <div className='title'> {value.title} </div>
            <div className='postText' onClick={() => {navigate(`/post/${value.id}`)}}> {value.postText} </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <ThumbUpIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accueil;