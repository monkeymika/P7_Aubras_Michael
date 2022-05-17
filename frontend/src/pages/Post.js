import React, {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from "../helpers/AuthContext";


// on passe l'id du post dans la base de données 
function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment]  = useState("");
    const {authState} = useContext(AuthContext);
    
    let navigate = useNavigate();
    //Requete axios pour l'id
    useEffect(() => {
        
        axios.get(`http://localhost:4000/posts/byId/${id}`).then((res) => {
            setPostObject(res.data);
        });
        
           axios.get(`http://localhost:4000/comments/${id}`).then((res) => {
            setComments(res.data);
        });
        
    },[id]);

    useEffect(() => {
        console.log(comments)
    }, [comments])

    // fonction qui ajoute un commentaire
    const addComment = () => {
        axios
            .post("http://localhost:4000/comments", 
            {commentBody: newComment , PostId: id}, 
            {headers: {accessToken: localStorage.getItem("accessToken")}} )
            .then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                const commentToAdd = res.data;
                setComments([...comments, commentToAdd ]);
                setNewComment("");
            }
        })
    };

    // fonction qui supprime les commentaires
    const deleteComment = (id) => {
        console.log({commentId: id})
        axios.delete(`http://localhost:4000/comments/${id}`, {
            headers: {accessToken: localStorage.getItem('accessToken')}
        }).then(() => {
            setComments(comments.filter((value) => {
                return value.id !== id;
            }))
        })
    };

    // fonction qui supprime le post
    const deletePost = (id) => {
        axios
        .delete(`http://localhost:4000/posts/${id}`, 
            {headers: {accessToken: localStorage.getItem("accessToken")}
        })
        .then(() => {
            navigate('/');
        })
    };

    return  (
        <div className='postPage'>
            <div className="leftSide">

                <div className="post" id='individual'>
                    <div className="title"> {postObject.title}</div>
                    {postObject.image !== null && (
                    <img
                    className="imagePost"
                    src={`http://localhost:4000/${postObject.image}`}
                    alt="img post"
                    />  
                    )}
                    <div className='postDescription'>{postObject.postText}</div>       
                    <div className="footer"> {postObject.username} 
                       {(authState.username === postObject.username) || authState.role === 'admin'
                        ? <button onClick={() => {deletePost(postObject.id)}}>Effacer publication </button> 
                        : ""
                        }
                    </div>
                </div>

            </div>

            <div className="rightSide">

                <div className='addCommentContainer'> 
                    <input 
                        type="text" 
                        placeholder="Comment..."  
                        autoComplete="off"
                        value={newComment}
                        onChange={(e) => {setNewComment(e.target.value)}} 
                    />
                    <button onClick={addComment}>Commenter</button>
                </div>

                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment"> 
                                {comment.commentBody}
                                <label> Utilisateur: {comment.username}</label>
                                {(authState.username === comment.username) || authState.role === 'admin'
                                  ? <button onClick={() => {deleteComment(comment.id)}}> X </button>
                                  : ""  
                                } 
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default Post;