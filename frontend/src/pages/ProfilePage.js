import React, { useEffect, useState, useContext } from 'react';
import {useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import {AuthContext} from "../helpers/AuthContext"

function ProfilePage() {
  let {id} = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [profileRole] = useState("visitor");

  const adminRole = authState.role === "admin";

  const deleteUser = () => {
    axios
      .delete(`http://localhost:4000/auth/deleteuser/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response);
        setAuthState({ username: "", id: 0, role: "", status: false });
        //alert(authState.status);
        navigate("/");
      });
  };

  useEffect (() => {
      axios.get(`http://localhost:4000/auth/info/${id}`)
      .then((res) => {
          setUsername(res.data.username)
      })

      axios.get(`http://localhost:4000/posts/byuserid/${id}`)
      .then((res) => {
          setListOfPosts(res.data)
      })
  }, [id]);

    
  return (
    <div className="profileContainer">
      <div className='profilePageContainer'>
        <div className='info'> 
          {" "}
          <h1 className="accountInfoTitle"> Détails du compte</h1> 
          <h5> Nom utilisateur : {username}</h5>
          <h5> Rôle : {profileRole}</h5>
          <div className='accountInfo'>
            <h4>Supprimer mon compte</h4>
            {authState.username === username || adminRole === true ? (
              <button className="smallBtn" onClick={deleteUser}>
                X
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="listOfPosts">
          {listOfPosts.map((value, key) => {
          return (
            <div key={key} className='post' > 
              <div className='title'> {value.title} </div>
              
              <div className='body' onClick={() => {navigate(`/post/${value.id}`)}}> 
                {value.image ? (
                  <img
                    className="imagePost"
                    src={`http://localhost:4000/${value.image}`}
                    alt="img post"
                  />
                ) : (
                  ""
                )}
              </div>

              <div className='postDescription'>{value.postText}</div>     
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
    </div>
  )
}

export default ProfilePage