import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../helpers/AuthContext";

function CreatePost() {
    const {authState} = useContext(AuthContext);

    let navigate = useNavigate();

    const initialValues = {
        title:"",
        postText:"",
        username:""
    };

    useEffect(() => {
        if(!authState.status) {
            navigate("/login");
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Le titre ne doit pas être vide"),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:4000/posts", data).then((res) => {
            navigate("/");
        });
    };

    
  return (
    <div className='createPostPage'> 
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >
            <Form className='formContainer'>
                <label>Title:</label>
                <ErrorMessage name='title' component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Title..." >       
                </Field>

                <label>Post:</label>
                <ErrorMessage name='postText' component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="(Ex. Post..." >       
                </Field>

                <label>Username</label>
                <ErrorMessage name='username' component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="(Ex. Bobby..." >       
                </Field>

                <button type='submit'> Create Post</button>
            </Form>
        </Formik> 
    </div>
  )
}

export default CreatePost;