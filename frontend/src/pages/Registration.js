import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

function Registration() {

  const initialValues = {
    username:"",
    email:"",
    password:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required(),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(4).max(20).required()
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:4000/auth", data).then(() => {
      console.log(data);
    })
  };

  return (
    <div>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
            <label>Pseudo:</label>
            <ErrorMessage name='username' component="span"/>
            <Field
              autocomplete="off" 
              id="inputCreatePost" 
              name="username" 
              placeholder="(Ex. luffy456..." >       
            </Field>

            <label>email:</label>
            <ErrorMessage name='email' component="span"/>
            <Field
              autocomplete="off" 
              id="inputCreatePost"
              name="email" 
              placeholder="(Ex. losPolosHermanos@gmail.com..." >       
            </Field>

            <label>Mot de passe:</label>
            <ErrorMessage name='password' component="span"/>
            <Field
              autocomplete="off"
              type="password" 
              id="inputCreatePost" 
              name="password" 
              placeholder="(Ex. Votre mot de passe..." >       
            </Field>

            <button type='submit'> S'inscrire</button>
        </Form>
      </Formik> 
    </div>)
}

export default Registration;