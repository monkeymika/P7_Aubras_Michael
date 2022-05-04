import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

// on passe l'id du post dans la base de données 
function Post() {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment]  = useState("");

    //Requete axios pour l'id
    useEffect(() => {
        axios.get(`http://localhost:4000/posts/byId/${id}`).then((res) => {
            setPostObject(res.data);
        });
    
        axios.get(`http://localhost:4000/comments/${id}`).then((res) => {
            setComments(res.data);
        });
    },[]);

    const addComment = () => {
        axios
            .post("http://localhost:4000/comments", 
            {commentBody: newComment , PostId: id}, 
            {headers: {accessToken: sessionStorage.getItem("accessToken")}} )
            .then((res) => {
            if (res.data.error) {
                console.log(res.data.error)
            } else {
                const commentToAdd = {commentBody: newComment};
                setComments([...comments, commentToAdd ]);
                setNewComment("");
            }
        })
    };

    return  (
        <div className='postPage'>
            <div className="leftSide">
                <div className="post" id='individual'>
                    <div className="title"> {postObject.title}</div>
                    <div className="postText"> {postObject.postText}</div>
                    <div className="footer"> {postObject.username}</div>
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
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post