import React, {useState, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

function CreatePost() {
    const [image, setImage] = useState("");
    let navigate = useNavigate();

    const initialValues = {
        title:"",
        postText:"",
    };
    /*Si non connecté l'utilisateur ne peux pas créer de post, et redirection vers login*/ 
    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    }, [navigate]);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Le titre ne doit pas être vide"),
        postText: Yup.string().required("La description ne doit pas être vide"),
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        console.log(image)
        formData.append("image", image);
        formData.append("title", data.title);
        formData.append("postText", data.postText);

        axios.post("http://localhost:4000/posts", formData, {headers: {accessToken: localStorage.getItem('accessToken')}})
        .then((res) => {
            navigate("/");
        });
    };

    
  return (
    <div className='createPostPage'> 
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit}
            method="POST"
            encType="multipart/form-data" 
            validationSchema={validationSchema}
        >
            <Form 
                className='formContainer'
                method="POST"
                action="/postimg"
                encType="multipart/form-data"
            >

                <label>Titre du post :</label>
                <ErrorMessage name='title' component="span"/>
                <Field
                    type="text"
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Title..." >       
                </Field>

                <label>Description du post :</label>
                <ErrorMessage name='postText' component="span"/>
                <Field
                    autoComplete="off"
                    className="inputCreatePost textAreaPost"
                    id="" 
                    name="postText" 
                    placeholder="(Ex. Post..." >       
                </Field>

                <div>
                    <label htmlFor="file"> Ajouter une image</label>

                    <input
                        id="file"
                        className="btn"
                        type="file"
                        name="image"
                        size="lg"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type='submit'> Create Post</button>
                </div> 
            </Form>
        </Formik> 
    </div>
  )
}

export default CreatePost;